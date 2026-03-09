export declare class InstagramWebhookMessageDto {
    sender_id: string;
    text: string;
    timestamp: number;
}
export declare class InstagramWebhookPayloadDto {
    object: string;
    entry: {
        id: string;
        time: number;
        messaging: {
            sender: {
                id: string;
            };
            recipient: {
                id: string;
            };
            timestamp: number;
            message: {
                mid: string;
                text: string;
            };
        }[];
    }[];
}
