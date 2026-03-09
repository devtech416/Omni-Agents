import { InstagramWebhookPayloadDto } from '../dtos/webhook-payload.dto';
import { ICrmRepositoryPort } from '../../domain/ports/crm-repository.port';
import { ILeadAnalyzerPort } from '../../domain/ports/lead-analyzer.port';
export declare class ProcessInstagramWebhookUseCase {
    private readonly crmRepository;
    private readonly leadAnalyzer;
    constructor(crmRepository: ICrmRepositoryPort, leadAnalyzer: ILeadAnalyzerPort);
    execute(payload: InstagramWebhookPayloadDto): Promise<void>;
}
