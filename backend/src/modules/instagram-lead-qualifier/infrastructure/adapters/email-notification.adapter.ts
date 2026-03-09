import { Injectable, Logger } from '@nestjs/common';
import { NotificationServicePort } from '../../domain/ports/notification-service.port';
import { LeadEntity } from '../../domain/entities/lead.entity';

@Injectable()
export class EmailNotificationAdapter implements NotificationServicePort {
  private readonly logger = new Logger(EmailNotificationAdapter.name);

  // eslint-disable-next-line @typescript-eslint/require-await
  async notifyHotLead(lead: LeadEntity): Promise<void> {
    // Here we'd integrate SendGrid, Resend, or a Slack/Telegram bot
    this.logger.warn(`🚀 [HOT LEAD DETECTED] notifying sales team about Insta ID: ${lead.instagramHandle}`);
  }
}
