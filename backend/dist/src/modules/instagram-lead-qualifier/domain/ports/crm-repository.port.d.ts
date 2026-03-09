import { LeadEntity } from '../entities/lead.entity';
import { InstagramMessageEntity } from '../entities/instagram-message.entity';
export declare const CRM_REPOSITORY_PORT: unique symbol;
export interface ICrmRepositoryPort {
    findByInstagramHandle(handle: string): Promise<LeadEntity | null>;
    saveLead(lead: LeadEntity): Promise<void>;
    saveMessage(message: InstagramMessageEntity): Promise<void>;
}
