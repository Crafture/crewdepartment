<template>
	<VideoPlayer :background_url="background_url" :fallback="fallback" />
	<div class="w-screen min-h-screen flex justify-center items-center">
		<div
			class="md:w-4/5 lg:w-8/12 xl:w-1/2 2xl:w-[720px] w-full flex flex-col justify-center items-center mx-4 mb-4">
			<div class="w-[160px] h-[160px] md:w-[320px] md:h-[320px]">
				<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink">
					<!-- Define shadow filter -->
					<defs>
						<filter id="f1" x="0" y="0" width="150%" height="150%">
							<feOffset result="offOut" in="SourceAlpha" dx="6" dy="6" />
							<feGaussianBlur result="blurOut" in="offOut" stdDeviation="3" />
							<feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
						</filter>
					</defs>
					<!-- Use the logo with the filter -->
					<image :xlink:href="logo" width="100%" height="100%" filter="url(#f1)" />
				</svg>
			</div>
			<div v-if="isSubmitting" class="m-6 flex flex-col justify-center items-center p-4 w-full h-full rounded-xl">
				<div role="status">
					<svg aria-hidden="true"
						class="inline w-20 h-20 md:w-40 md:h-40 mr-2 text-gray-200 animate-spin text-livecrowdblue fill-livecrowdturquoise"
						viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
							fill="currentColor" />
						<path
							d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
							fill="currentFill" />
					</svg>
				</div>
			</div>
			<section v-else
				class="relative bg-white dark:bg-gray-800 rounded-lg w-full sm:px-4 lg:px-6 overscroll-x-none">
				<div class="max-w-2xl px-4 py-8 mx-auto lg:py-16 m-4">
					<h2 class="text-xl font-bold text-gray-900 dark:text-white">{{ props.request }}formulier</h2>
					<div v-if="props.request.toLocaleLowerCase() == 'ruilverzoek'">
						<p class="mb-4 text-md italic text-gray-700 dark:text-gray-300">Om jouw verzoek verder in
							behandeling te kunnen nemen en eventueel je tickets te kunnen ruilen, hebben we onderstaande
							gegevens nodig.</p>
					</div>
					<div v-else>
						<p class="mb-4 text-md italic text-gray-700 dark:text-gray-300">Om jouw {{
		props.request.toLocaleLowerCase() }} verder in behandeling te
							kunnen nemen hebben wij onderstaande gegevens nodig.</p>
					</div>
					<form @submit.prevent="handleSubmit">
						<div class="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-6">
							<div class="col-span-2">
								<label for="event"
									class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event</label>

								<select id="event" v-model="selectedEvent" required
									class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
									placeholder="Select an event or festival">
									<option disabled value="">Select an event</option>
									<option v-for="event in events" :key="event.id" :value="event">
										{{ event.display_name }}
									</option>
								</select>
								<!-- Display the selected venue name here -->
								<div v-if="selectedEvent"
									class="mt-2 bg-gray-50 dark:bg-gray-700 px-3 py-2.5 border-[0.5px] border-gray-500 text-sm font-medium dark:text-gray-100 dark:text-white rounded-lg">
									Venue: {{ selectedEvent.venue_name }}
								</div>
							</div>
							<div class="col-span-2 sm:col-span-1">
								<label for="order-number"
									class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ordernummer</label>
								<input type="tel" name="order-number" id="order-number" v-model="formData.orderNumber"
									required
									class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
									placeholder="Ticket id" pattern="^2\d{7}$"
									title="het ordernummer start met een 2 and is 8 cijfers lang">
							</div>
							<div class="col-span-2 sm:col-span-1">
								<label for="total-tickets"
									class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Aantal
									tickets</label>
								<input type="tel" v-model="formData.nbrOfTickets" min="0" placeholder="0" required
									class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
							</div>
							<div v-if="props.showDropdown" class="col-span-2 sm:col-span-1">
								<label for="ticket-owned"
									class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Huidig
									ticket</label>
								<select id="ticket-owned" required v-model="formData.ownedTicket"
									placeholder="Choose a ticket variant"
									class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
									<option disabled value="">Selecteer ticket</option>
									<option value="None">Geen Ticket</option>
									<option value="Standing">Staanplaats</option>
									<option value="Seating">Zitplaats</option>
									<option value="Wheelchair">Rolstoel</option>
								</select>
							</div>
							<div v-if='props.showDropdown' class="col-span-2 sm:col-span-1">
								<label for="ticket-requested"
									class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gewenst
									ticket</label>
								<select id="ticket-requested" required v-model="formData.requestedTicket"
									placeholder="Choose a ticket variant"
									class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
									<option disabled value="">Selecteer ticket</option>
									<option value="None">Geen Ticket</option>
									<option value="Standing">Staanplaats</option>
									<option value="Seating">Zitplaats</option>
									<option value="Wheelchair">Rolstoel</option>
								</select>
							</div>
							<div class="col-span-2">
								<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Datum
									event</label>
								<VueTailwindDatePicker v-model="formData.dateValue" as-single :formatter="formatter"
									readonly required
									input-classes="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
							</div>
							<div class="col-span-2">
								<label for="description"
									class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{
		props.description }}</label>
								<textarea id="description" rows="8" v-model="formData.description" required
									class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
									placeholder="Vul hier de reden voor jouw verzoek in"></textarea>
							</div>
							<div class="col-span-2 mt-2">
								<div class="custom-file-upload w-full mt-3">
									<label for="file_input" class="custom-button">
										{{ fileLabel_textContent }}
									</label>

									<input @change="uploadFile" id="file_input" type="file">
									<p class="mt-3 text-sm font-light text-gray-500 dark:text-gray-100"><em>Voeg hier
											eventueel een bijlage toe</em></p>
								</div>
							</div>
							<div class="col-span-2 sm:col-span-1">
								<label for="first-name"
									class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Voornaam</label>
								<input type="text" name="first-name" id="first-name" v-model="formData.firstName"
									required
									class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
									placeholder="Voornaam">
							</div>
							<div class="col-span-2 sm:col-span-1">
								<label for="last-name"
									class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Achternaam</label>
								<input type="text" name="last-name" id="last-name" v-model="formData.lastName" required
									class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
									placeholder="Achternaam">
							</div>
							<div class="col-span-2 sm:col-span-1">
								<label for="email"
									class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail</label>
								<input type="email" name="email" id="email" v-model="formData.email" required
									class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
									placeholder="your-email@email.com">
							</div>
							<div class="w-full col-span-2 sm:col-span-1">
								<label for="phone"
									class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefoonnummer</label>
								<VueTelInput mode="international" v-model="phone" class="!rounded-lg !border-gray-600"
									:dropdownOptions="{ showSearchBox: true, showFlags: true }"
									:styleClasses="'custom-tel-input'"
									:inputOptions="{ showDialCode: true, autofocus: false, type: 'tel', required: true }" />
							</div>
							<div class="col-span-2">
								<p class="text-md mb-[-8] italic text-gray-700 dark:text-gray-300">Via welke wijze wil
									je op
									de hoogte gehouden worden?</p>
							</div>
							<div class="flex mb-4 justify-between mr-8">
								<div class="mr-6">
									<input checked id="default-radio-1" type="radio" value="email" name="default-radio"
										v-model="contactMethod"
										class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
									<label for="default-radio-1"
										class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">E-mail</label>
								</div>
								<div class="">
									<input id="default-radio-2" type="radio" value="whatsapp" name="default-radio"
										v-model="contactMethod"
										class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
									<label for="default-radio-2"
										class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">WhatsApp</label>
								</div>
							</div>
						</div>
						<div class="mt-8 w-full">
							<button type="submit"
								class="text-white w-full bg-gradient-to-r from-livecrowdblue to-livecrowdturquoise hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
								Verstuur verzoek
							</button>
						</div>
					</form>
				</div>
			</section>
		</div>
	</div>
	<div>
		<fwb-modal v-if="isShowModal" @close="closeModal" persistent>
			<template #header>
				<div class="flex items-center text-lg dark:text-gray-300">
					<p>Bedankt voor het indienen van jouw {{ props.request }}</p>
				</div>
			</template>
			<template #body>
				<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400 mx-6 mt-3">
					Bedankt voor het indienen van jouw {{ props.request }}.
				</p>
				<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400 mx-6 mt-3">
					Jouw {{ props.request }} is in goede orde ontvangen.
				</p>
				<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400 mx-6 mb-4 mt-3">
					Wij zullen binnen redelijke termijn bij je terug komen als we een update hebben.
				</p>
			</template>
			<template #footer>
			</template>
		</fwb-modal>
	</div>
</template>

<script setup>
import { VueTelInput } from 'vue-tel-input';
import 'vue-tel-input/vue-tel-input.css';
import VideoPlayer from '~/components/VideoPlayer/CdnLinkPLayer.vue'
import VueTailwindDatePicker from "vue-tailwind-datepicker"; // https://vue-tailwind-datepicker.com/props.html
import { FwbModal, FwbCheckbox } from 'flowbite-vue'

const config = useRuntimeConfig();

const formatter = ref({
	date: 'DD MMM YYYY',
	month: 'MMM',
})

const background_url = "https://s3.eu-central-1.amazonaws.com/cdn.crafture.com/livecrowd/bgvideos/MOJO.mp4";
const fallback = "/images/fallback.webp";
const logo = '/livecrowd.webp';

const file = ref(null);
const isSubmitting = ref(false);
const formData = ref([]);
const phone = ref("");
const isShowModal = ref(false);
const contactMethod = ref('email');
const selectedEvent = ref(null);
const fileLabel_textContent = ref("Voeg bijlage toe")

useHead({
	meta: [
		{
			name: 'viewport',
			content: 'width=device-width, initial-scale=1, maximum-scale=1',
		},
	],
})


watch(selectedEvent, (newVal, oldVal) => {
	if (newVal) {
		formData.value.event = newVal.display_name;
		formData.value.venue = newVal.venue_name;
	}
});

const props = defineProps({
	showDropdown: {
		Type: Boolean,
		default: false
	},
	request: {
		Type: String,
		default: 'Verzoek'
	},
	description: {
		Type: String,
		default: 'Reden'
	},
	filter: {
		Type: String,
		default: ''
	}
})

function getInitialFormState() {

	return {
		request_id: '',
		request: props.request,
		event: '',
		venue: '',
		orderNumber: '',
		dateValue: '',
		ownedTicket: '',
		requestedTicket: '',
		nbrOfTickets: '',
		description: '',
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		contactMethod: '',
		descriptionText: props.description,
		file: null,
	};
}

function resetFormData() {
	formData.value = getInitialFormState();
	formData.value.request_id = '#' + Math.random().toString(36).toUpperCase().slice(2, 9);
}

function closeModal() {
	isShowModal.value = false
}
function showModal() {
	isShowModal.value = true
	setTimeout(() => {
		isShowModal.value = false;
	}, 4000);
}

const { pending, error, refresh, data: events } = await useFetch(`https://backend.livecrowd.com/events/?filter=mojo&filter=${props.filter}`, {
	onRequest({ request, options }) {
	},
	onRequestError({ request, options, error }) {
		console.log(error);
	},
	onResponse({ request, response, options }) {
		if (response._data && Array.isArray(response._data)) {
			response._data.sort((a, b) => a.name.localeCompare(b.name));
		}
	},
	onResponseError({ request, response, options }) {
		console.log("Could not get event data");
	}
})

onMounted(() => {
	formData.value = getInitialFormState();
	formData.value.request_id = '#' + Math.random().toString(36).toUpperCase().slice(2, 9);
})

async function handleSubmit(event) {
	event.preventDefault();
	isSubmitting.value = true;
	formData.value.contactMethod = contactMethod.value;
	if (phone.value) {
		formData.value.phone = phone.value.replaceAll(" ", "");
	}
	try {
		const data = await $fetch('/api/submitToSheet', {
			method: 'POST',
			body: formData.value,
		});
		resetFormData();
		showModal();
	} catch (error) {
		console.error(error);
	}
	finally {
		isSubmitting.value = false;
	}
}

const fileName = computed(() => file.value?.name);
const fileExtension = computed(() => fileName.value?.substr(fileName.value?.lastIndexOf(".") + 1));
const fileMimeType = computed(() => file.value?.type);

const uploadFile = async (event) => {
	fileLabel_textContent.value = 'Bijlage toegevoegd	✓';
	file.value = event.target.files[0];
	if (file.value) {
		await submitFile();
	}
};

const submitFile = async () => {
	const reader = new FileReader();
	reader.readAsDataURL(file.value);
	reader.onload = async () => {
		const encodedFile = reader.result.split(",")[1];
		const data = {
			file: encodedFile,
			fileName: fileName.value,
			fileExtension: fileExtension.value,
			fileMimeType: fileMimeType.value,
		};
		formData.value.file = data;
	};
};

</script>

<style scoped>
.custom-tel-input :deep(.vti__input) {
  background-color: #f9fafb;
  border: 1px solid #d1d5db;
  color: #1f2937;
  border-radius: 5px !important;
  font-size: 0.875rem;
  padding: 0.625rem;
  width: 100%;
  line-height: 1.25rem;
}

.custom-tel-input :deep(.vti__input:focus) {
  /* border-color: #25eb7b; */
  outline: none;
  box-shadow: 0 0 0 2px rgba(31, 154, 29, 0.808)
}

.custom-tel-input :deep(.vti__dropdown-list) {
  background-color: #ffffff;
  border-color: #d1d5db;
  color: #1f2937;
}

.custom-tel-input :deep(.vti__dropdown-list li:hover) {
  background-color: #e5e7eb;
}

@media (prefers-color-scheme: dark) {
  .custom-tel-input :deep(.vti__input) {
    background-color: #374151;
    border-color: #4b5563;
    color: #f9fafb;
    border-radius: 0.375rem;
  }

  .custom-tel-input :deep(.vti__dropdown-list) {
    background-color: #1f2937;
    border-color: #4b5563;
    color: #ececec;
  }

  .custom-tel-input :deep(.vti__dropdown-list li:hover) {
    background-color: #374151;
  }
  .custom-tel-input :deep(.vti__dropdown:hover) {
    background-color: #374151;
  }
}
	.custom-file-upload {
		position: relative;
		width: 100%;
		display: block;
	}

	.custom-button {
		background-color: #374151;
		color: #ffffff;
		padding: 10px 20px;
		border-radius: 5px;
		width: 100%;
		cursor: pointer;
	}

	.custom-button:hover {
		background-color: #64748b;
		/* Hover background color */
	}

	/* Hide the file input */
	input[type="file"] {
		position: absolute;
		left: -9999px;
	}

	/* .vue-tel-input :deep(.vti__dropdown-list) {
	border-top-left-radius: 0.5rem;
	border-bottom-left-radius: 0.5rem;
	color: #4b5563;
}

.dark-mode .vue-tel-input :deep(.vti__dropdown-list) {
	background: #374151;
	border-color: #4B5563;
	color: #f9fafb;
}

.dark-mode .vue-tel-input :deep(.vti__dropdown-list .highlighted) {
	background-color: #1f2937;
	/* Background color on hover */
	/* } */

	.fwb-modal {
		/* Center the modal in the viewport */
		position: fixed;
		/* Fixed position */
		top: 50%;
		/* Push down by half of viewport height */
		left: 50%;
		/* Push right by half of viewport width */
		transform: translate(-50%, -50%);
		/* Adjust position to center modal */
		z-index: 1000;
		/* Ensure it's above other content */
	}</style>