export const INSTAGRAM_API_PORT = 'INSTAGRAM_API_PORT';

export interface InstagramApiPort {
  sendMessage(recipientId: string, messageText: string): Promise<boolean>;
}
