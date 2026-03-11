export interface ContentDraftEntity {
  id: string;
  topic: string;
  content: string;
  prompt?: string;
  imageUrl?: string;
  status: 'PENDING_REVIEW' | 'APPROVED' | 'PUBLISHED';
  platform: string;
}

export const CONTENT_DRAFT_REPOSITORY = Symbol('CONTENT_DRAFT_REPOSITORY');

export interface ContentDraftRepository {
  saveDraft(draft: Omit<ContentDraftEntity, 'id'>): Promise<ContentDraftEntity>;
}
