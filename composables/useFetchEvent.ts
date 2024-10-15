interface Event {
    popup_title: string;
    popup_body: string;
    popup_enabled: boolean;
    sos_enabled: boolean;
}

export const useFetchEvent = (event_name: string) => {
    const defaultEvent: Event = {
        popup_title: '',
        popup_body: '',
        popup_enabled: false,
        sos_enabled: false,
    };

    const event: Ref<Event | null> = ref(null);
    const error: Ref<string | null> = ref(null);

    const config = useRuntimeConfig();
    const baseUrl = config.public.BACKEND_BASE_URL;

    const fetchEvent = async () => {
        try {
            const response = await fetch(`${baseUrl}/events/options/${event_name}`, {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error(`Error fetching event: ${response.statusText}`);
            }

            event.value = await response.json();
        } catch (err: any) {
            error.value = err.message;
            event.value = defaultEvent;
            console.error(err);
        }
    };

    fetchEvent();

    return { event, error };
};
