export declare const LEAD_ANALYZER_PORT: unique symbol;
export interface ILeadAnalyzerPort {
    analyzeLeadIntent(messages: string[]): Promise<{
        score: number;
        summary: string;
        status: 'NEW' | 'CONTACTED' | 'WARM' | 'COLD';
    }>;
}
