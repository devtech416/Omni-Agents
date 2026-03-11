import { Injectable, Logger } from '@nestjs/common';
import { InstagramApiPort } from '../../domain/ports/instagram-api.port';

@Injectable()
export class MetaGraphApiAdapter implements InstagramApiPort {
  private readonly logger = new Logger(MetaGraphApiAdapter.name);

  async sendMessage(
    recipientId: string,
    messageText: string,
  ): Promise<boolean> {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const accountId = process.env.INSTAGRAM_ACCOUNT_ID;
    const apiVersion = 'v25.0';

    if (!accessToken || !accountId) {
      this.logger.error(
        'Missing Instagram credentials in .env (INSTAGRAM_ACCESS_TOKEN / INSTAGRAM_ACCOUNT_ID)',
      );
      return false;
    }

    const url = `https://graph.facebook.com/${apiVersion}/${accountId}/messages`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          recipient: { id: recipientId },
          message: { text: messageText },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        this.logger.error(
          `Failed to send message to Instagram API: ${JSON.stringify(errorData)}`,
        );
        return false;
      }

      this.logger.log(`✅ Message sent to ${recipientId}: "${messageText}"`);
      return true;
    } catch (error) {
      this.logger.error('Exception sending message to Instagram API', error);
      return false;
    }
  }
}
