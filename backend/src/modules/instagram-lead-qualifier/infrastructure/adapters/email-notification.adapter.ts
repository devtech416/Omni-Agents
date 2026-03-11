import { Injectable, Logger } from '@nestjs/common';
import { NotificationServicePort } from '../../domain/ports/notification-service.port';
import { LeadEntity } from '../../domain/entities/lead.entity';

@Injectable()
export class EmailNotificationAdapter implements NotificationServicePort {
  private readonly logger = new Logger(EmailNotificationAdapter.name);

  async notifyHotLead(lead: LeadEntity): Promise<void> {
    this.logger.warn(
      `🚀 [HOT LEAD DETECTED] notifying sales team about Insta ID: ${lead.instagramHandle}`,
    );

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      try {
        const message = `🔥 *Nuevo Lead Calificado!*\n\n*Usuario:* @${lead.instagramHandle}\n*Puntuación:* ${lead.priorityScore}/100\n*Resumen:* ${lead.aiSummary}`;
        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

        await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'Markdown',
          }),
        });
        this.logger.log('✅ Telegram notification sent successfully.');
      } catch (error) {
        this.logger.error('❌ Failed to send Telegram notification', error);
      }
    } else {
      this.logger.warn('⚠️ Telegram credentials not found in environment.');
    }
  }
}
