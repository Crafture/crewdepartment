
declare interface VerifiedMessageAccount {
    id: number;
    name: string;
    slug: string;
    avatar: string;
    link: string;
}

declare interface Message {
    id: number;
    title: string;
    message: string;
    alert: boolean;
    publish: boolean;
    likes: number;
    dislikes: number;
    event_id: number;
    created_at: string;
    updated_at: string;
    verified_message_account?: VerifiedMessageAccount | null;
}
