export declare class InstagramMessageEntity {
    readonly id: string;
    readonly leadId: string;
    readonly senderId: string;
    readonly text: string;
    readonly direction: 'INBOUND' | 'OUTBOUND';
    timestamp: Date;
    constructor(id: string, leadId: string, senderId: string, text: string, direction: 'INBOUND' | 'OUTBOUND', timestamp: Date);
    static createInbound(leadId: string, senderId: string, text: string): InstagramMessageEntity;
}
