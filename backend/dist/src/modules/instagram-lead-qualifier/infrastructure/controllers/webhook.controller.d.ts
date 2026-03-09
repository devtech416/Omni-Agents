import { InstagramWebhookPayloadDto } from '../../application/dtos/webhook-payload.dto';
import { ProcessInstagramWebhookUseCase } from '../../application/use-cases/process-instagram-webhook.usecase';
export declare class InstagramWebhookController {
    private readonly processWebhookUseCase;
    private readonly prisma;
    constructor(processWebhookUseCase: ProcessInstagramWebhookUseCase);
    handleWebhook(payload: InstagramWebhookPayloadDto): Promise<string>;
    getLeads(): Promise<({
        messages: {
            id: string;
            leadId: string;
            senderId: string;
            text: string;
            direction: string;
            timestamp: Date;
        }[];
    } & {
        id: string;
        instagramHandle: string;
        fullName: string | null;
        status: string;
        priorityScore: number;
        aiSummary: string | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
}
