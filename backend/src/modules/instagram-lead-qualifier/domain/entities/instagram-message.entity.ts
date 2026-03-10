export class InstagramMessageEntity {
  constructor(
    public readonly id: string,
    public readonly leadId: string,
    public readonly senderId: string,
    public readonly text: string,
    public readonly direction: 'INBOUND' | 'OUTBOUND',
    public timestamp: Date,
  ) {}

  static createInbound(
    leadId: string,
    senderId: string,
    text: string,
  ): InstagramMessageEntity {
    return new InstagramMessageEntity(
      crypto.randomUUID(),
      leadId,
      senderId,
      text,
      'INBOUND',
      new Date(),
    );
  }
}
