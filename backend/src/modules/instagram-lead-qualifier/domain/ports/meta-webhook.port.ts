import { InstagramMessageEntity } from '../entities/instagram-message.entity';

export const META_WEBHOOK_PORT = 'META_WEBHOOK_PORT';

export interface MetaWebhookPort {
  receiveWebhook(payload: any): Promise<InstagramMessageEntity[]>;
}
