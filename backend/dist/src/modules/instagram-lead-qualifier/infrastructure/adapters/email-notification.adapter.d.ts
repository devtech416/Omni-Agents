import { NotificationServicePort } from '../../domain/ports/notification-service.port';
import { LeadEntity } from '../../domain/entities/lead.entity';
export declare class EmailNotificationAdapter implements NotificationServicePort {
    private readonly logger;
    notifyHotLead(lead: LeadEntity): Promise<void>;
}
