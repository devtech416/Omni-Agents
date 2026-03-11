export class TelegramCommand {
  private readonly command: string;
  private readonly payload: string;

  constructor(rawText: string) {
    if (!rawText.startsWith('/')) {
      this.command = '';
      this.payload = rawText;
      return;
    }

    const firstSpaceIndex = rawText.indexOf(' ');
    
    if (firstSpaceIndex === -1) {
      this.command = rawText;
      this.payload = '';
    } else {
      this.command = rawText.substring(0, firstSpaceIndex).trim();
      this.payload = rawText.substring(firstSpaceIndex + 1); // keep trailing spaces if any
    }
  }

  getCommand(): string {
    return this.command;
  }

  getPayload(): string {
    return this.payload;
  }
}
