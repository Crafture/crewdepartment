import { google } from 'googleapis'
import { Readable } from 'stream';
import * as fs from 'fs/promises';
import path from 'path';

interface MessageDataBase {
  readonly event: String;
  readonly request_id: String;
  readonly request: String;
  readonly orderNumber: String;
  readonly ownedTicket: String,
  readonly requestedTicket: String,
  readonly nbrOfTickets: String,
  readonly description: String;
  readonly dateValue: String;
  readonly firstName: String;
  readonly lastName: String;
  readonly descriptionText: String;
}

interface EmailData extends MessageDataBase {
  readonly email: String;
  readonly phone: String;
}

interface PhoneData extends MessageDataBase, EmailData {
}

export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig();
    const body = await readBody(event);
    let webViewLink = null;
    if (body.file) {
      const driveAuth = await authorizeDrive();
      const folderId = config.sharedDriveId;

      // Handle file upload to Drive
      const drive = google.drive({ version: 'v3', auth: driveAuth });
      const fileMetadata = {
        name: body.file.fileName,
        mimeType: body.file.fileMimeType,
        parents: [folderId],
      };
      const media = {
        mimeType: body.fileMimeType,
        // Convert base64 to buffer since the API expects a stream or buffer
        body: Readable.from(Buffer.from(body.file.file, 'base64')),
      };

      const file = await drive.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: 'id, webViewLink', // Request the webViewLink to be returned
      });
      webViewLink = file.data.webViewLink;
      console.log(webViewLink)
    }

    const { sheets } = google;
    const auth = await authorizeSheet();

    const sheetsApi = sheets({ version: 'v4', auth });

    let date = new Date().toUTCString().slice(5, 16);

    await sheetsApi.spreadsheets.values.append({
      spreadsheetId: config.sheetId,
      range: 'Nieuwe verzoeken!A2:I',  // Adjust based on where you want to start the append
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [
            date,
            body.event,
            body.request_id,
            body.request,
            body.orderNumber,
            body.ownedTicket,
            body.requestedTicket,
            body.nbrOfTickets,
            body.dateValue,
            body.description,
            body.firstName,
            body.lastName,
            body.email,
            body.phone,
            body.contactMethod,
            webViewLink
          ]
        ]
      }
    });
    if (body.contactMethod == 'whatsapp') {
      await sendWhatsapp(body);
    }
    else {
      await sendEmail(body);
    }
    return { message: 'Data submitted successfully' };
  }
  catch (error: any) {
    console.error('Error in event handler:', error);
    return {
      statusCode: error.statusCode,
      body: JSON.stringify({
        error: true,
        message: error.message,
      }),
    };
  }
})


async function authorizeSheet() {
  const config = useRuntimeConfig()
  const client = new google.auth.JWT(
    config.googleServiceAccountEmail,
    undefined,
    config.googlePrivateKey,
    ['https://www.googleapis.com/auth/spreadsheets']
  );

  try {
    await client.authorize();
    console.log('Authorization successfull.');
    return client;
  } catch (err) {
    console.error('Error authorizing JWT client:', err);
    throw err;
  }
}


async function authorizeDrive() {
  const config = useRuntimeConfig();
  const client = new google.auth.JWT(
    config.googleServiceAccountEmail,
    undefined,
    config.googlePrivateKey,
    ['https://www.googleapis.com/auth/drive.file']
  );

  try {
    await client.authorize();
    return client;
  } catch (err) {
    console.error('Error authorizing Drive client:', err);
    throw err;
  }
}

async function sendEmail(emailData: EmailData): Promise<void> {
  // Assuming you have the sender and recipient's email addresses in formData
  const config = useRuntimeConfig();
  const templateContent = await readTemplate(emailData.request);

  let subject = "Uw klacht wordt in behandeling genomen door het Livecrowd team"
  if (emailData.request === "Ruilverzoek" || emailData.request === "Speciaal verzoek") {
    subject = "Uw verzoek in behandeling genomen door het Livecrowd team";
  }
  const payload = {
    sender: "vraag@mojo.nl",
    subject: subject,
    template: templateContent,
    recipients: [
      {
        email: emailData.email,
        context: {
          event: emailData.event,
          request: emailData.request.toLowerCase(),
          request_id: emailData.request_id,
          order_number: emailData.orderNumber,
          description: emailData.description,
          date_value: emailData.dateValue,
          first_name: emailData.firstName,
          last_name: emailData.lastName,
          email: emailData.email,
          owned_ticket: emailData.ownedTicket,
          requested_ticket: emailData.requestedTicket,
          number_of_tickets: emailData.nbrOfTickets,
          phone: emailData.phone,
        }
      }
    ]
  };

  try {
    await $fetch('https://sendmessa.ge/mailing/api/send/', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Authorization' : "token " + config.sendmessageApiToken,
        'Content-Type': 'application/json',
      },
      async onResponse({ request, response, options }) {
        console.log("[fetch response]", request, response.status, response.body);
      },
      async onRequestError({ request, options, error }) {
        console.log("[fetch request error]", request, error);
      },
      async onResponseError({ request, response, options }) {
        console.log(
          "[fetch response error]",
          request,
          response.status,
          response.body
        );
      },
    });

  } catch (error) {
    console.error('Error sending email:', error);
  }
}


async function readTemplate(request: String): Promise<string> {

  let templatePath = ""
  if (request === "Ruilverzoek" || request === "Speciaal verzoek") {
    templatePath = path.join(process.cwd(), 'assets', 'typeform/verzoek-template.html');
  } else {
    templatePath = path.join(process.cwd(), 'assets', 'typeform/feedback-template.html');
  }
  
  try {
    const templateContent = await fs.readFile(templatePath, 'utf8');
    return templateContent;
  } catch (error) {
    console.error('Error reading template:', error);
    throw error;
  }
}

async function sendWhatsapp(phoneData: PhoneData): Promise<void> {
  const config = useRuntimeConfig();
  const payload = {
    lang_code: "nl",
    template_name: "livecrowd_verzoek_ontvangen_3",
    image_url: "https://s3.eu-central-1.amazonaws.com/cdn.crafture.com/livecrowd/logos/MOJO+Logo.jpg",
    recipients: [
      {
        phone: phoneData.phone,
        context: [
          phoneData.firstName,
          phoneData.request.toLowerCase(),
          phoneData.event,
          phoneData.request.toLowerCase(),
          phoneData.event,
          phoneData.firstName,
          phoneData.lastName,
          phoneData.email,
          phoneData.phone,
          phoneData.orderNumber,
          phoneData.nbrOfTickets,
          phoneData.descriptionText,
          phoneData.description,
        ]
      }
    ]
  };
  try {
    await $fetch('https://sendmessa.ge/whatsapp/api/send/', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Authorization' : "token " + config.sendmessageApiToken,
        'Content-Type': 'application/json',
      },
      async onRequest({ request, options }) {
        console.log("[fetch request]", request, options);
      },
      async onResponse({ request, response, options }) {
        console.log("[fetch response]", request, response.status, response.body);
      },
      async onRequestError({ request, options, error }) {
        console.log("[fetch request error]", request, error);
      },
      async onResponseError({ request, response, options }) {
        const responseBody = await response.text(); // Convert the response stream to text
        console.log("[fetch response error]", request, response.status, responseBody);
      }
    });

  } catch (error) {
    console.error('Error sending whatsapp:', error);
  }
}
