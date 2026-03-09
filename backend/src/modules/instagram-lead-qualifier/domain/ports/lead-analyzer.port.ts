export const LEAD_ANALYZER_PORT = Symbol('LEAD_ANALYZER_PORT');

export interface ILeadAnalyzerPort {
  analyzeLeadIntent(messages: string[]): Promise<{
    score: number;
    summary: string;
    status: 'NEW' | 'CONTACTED' | 'WARM' | 'COLD';
  }>;
}
