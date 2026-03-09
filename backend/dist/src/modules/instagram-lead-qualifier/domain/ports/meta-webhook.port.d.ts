import { InstagramMessageEntity } from '../entities/instagram-message.entity';
export declare const META_WEBHOOK_PORT = "META_WEBHOOK_PORT";
export interface MetaWebhookPort {
    receiveWebhook(payload: any): Promise<InstagramMessageEntity[]>;
}
