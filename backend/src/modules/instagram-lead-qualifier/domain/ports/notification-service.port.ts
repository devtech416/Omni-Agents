import { LeadEntity } from '../entities/lead.entity';

export const NOTIFICATION_SERVICE = 'NOTIFICATION_SERVICE';

export interface NotificationServicePort {
  notifyHotLead(lead: LeadEntity): Promise<void>;
}
