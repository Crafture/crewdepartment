
self.addEventListener('push', function (event) {
    const data = event.data ? event.data.json() : {};

    const options = {
        body: data.body || 'We have received a push message.',
        icon: data.icon || 'https://s3.eu-central-1.amazonaws.com/cdn.crafture.com/livecrowd.com/livecrowd_logo.png',
        data: {
            url: data.url || 'https://livecrowd.com'
        }
    };

    event.waitUntil(
        self.registration.showNotification(data.title || 'Notification', options).then(() => {
            self.clients.matchAll({ includeUncontrolled: true, type: 'window' }).then(clients => {
                clients.forEach(client => {
                    client.postMessage({
                        type: 'PUSH_NOTIFICATION_RECEIVED'
                    });
                });
            });
        })
    );
});

self.addEventListener('notificationclick', function (event) {

    event.notification.close();

    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(function (clientList) {
            for (var i = 0; i < clientList.length; i++) {
                var client = clientList[i];
                if (client.url === event.notification.data.url && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(event.notification.data.url);
            }
        })
    );
});
