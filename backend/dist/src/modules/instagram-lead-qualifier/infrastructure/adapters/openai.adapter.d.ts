import { ILeadAnalyzerPort } from '../../domain/ports/lead-analyzer.port';
export declare class OpenAiAnalyzerAdapter implements ILeadAnalyzerPort {
    analyzeLeadIntent(messages: string[]): Promise<{
        score: number;
        summary: string;
        status: 'NEW' | 'CONTACTED' | 'WARM' | 'COLD';
    }>;
}
