import { ICrmRepositoryPort } from '../../domain/ports/crm-repository.port';
import { LeadEntity } from '../../domain/entities/lead.entity';
import { InstagramMessageEntity } from '../../domain/entities/instagram-message.entity';
export declare class PrismaCrmAdapter implements ICrmRepositoryPort {
    private readonly prisma;
    findByInstagramHandle(handle: string): Promise<LeadEntity | null>;
    saveLead(lead: LeadEntity): Promise<void>;
    saveMessage(message: InstagramMessageEntity): Promise<void>;
}
