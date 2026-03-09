export declare class LeadEntity {
    readonly id: string;
    instagramHandle: string;
    fullName: string | null;
    status: string;
    priorityScore: number;
    aiSummary: string | null;
    createdAt: Date;
    updatedAt: Date;
    constructor(id: string, instagramHandle: string, fullName: string | null, status: string, priorityScore: number, aiSummary: string | null, createdAt: Date, updatedAt: Date);
    static create(instagramHandle: string, fullName?: string): LeadEntity;
    updateScore(score: number): void;
    updateStatus(status: 'NEW' | 'CONTACTED' | 'WARM' | 'COLD'): void;
}
