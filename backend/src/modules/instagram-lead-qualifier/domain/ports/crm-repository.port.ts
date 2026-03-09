import { LeadEntity } from '../entities/lead.entity';
import { InstagramMessageEntity } from '../entities/instagram-message.entity';

export const CRM_REPOSITORY_PORT = Symbol('CRM_REPOSITORY_PORT');

export interface ICrmRepositoryPort {
  findByInstagramHandle(handle: string): Promise<LeadEntity | null>;
  saveLead(lead: LeadEntity): Promise<void>;
  saveMessage(message: InstagramMessageEntity): Promise<void>;
}
