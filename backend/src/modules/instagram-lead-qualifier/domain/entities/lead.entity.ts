export class LeadEntity {
  constructor(
    public readonly id: string,
    public instagramHandle: string,
    public fullName: string | null,
    public status: string,
    public priorityScore: number,
    public aiSummary: string | null,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  static create(instagramHandle: string, fullName?: string): LeadEntity {
    return new LeadEntity(
      crypto.randomUUID(),
      instagramHandle,
      fullName || null,
      'NEW',
      0,
      null,
      new Date(),
      new Date(),
    );
  }

  updateScore(score: number): void {
    this.priorityScore = score;
    this.updatedAt = new Date();
  }

  updateStatus(status: 'NEW' | 'CONTACTED' | 'WARM' | 'COLD'): void {
    this.status = status;
    this.updatedAt = new Date();
  }
}
