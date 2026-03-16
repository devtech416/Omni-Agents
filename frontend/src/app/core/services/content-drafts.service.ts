import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface ContentDraft {
  id: string;
  topic: string;
  content: string;
  prompt?: string;
  imageUrl?: string;
  status: 'PENDING_REVIEW' | 'APPROVED' | 'PUBLISHED' | 'REJECTED';
  platform: string;
  folder?: string;
  category?: string;
  createdAt: string | Date;
}

export interface GenerateDraftRequest {
  topic: string;
  referenceImageUrl?: string;
  folder?: string;
  category?: string;
  engine?: 'DALL-E' | 'CANVA';
}

export interface UpdateDraftRequest {
  content?: string;
  folder?: string;
  category?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContentDraftsService {
  private apiUrl = `http://localhost:3014/api/content-drafts`;

  constructor(private http: HttpClient) {}

  generateDraft(request: GenerateDraftRequest): Observable<ContentDraft> {
    return this.http.post<ContentDraft>(`${this.apiUrl}/generate`, request);
  }

  getPendingDrafts(): Observable<ContentDraft[]> {
    return this.http.get<ContentDraft[]>(this.apiUrl);
  }

  getApprovedDrafts(): Observable<ContentDraft[]> {
    return this.http.get<ContentDraft[]>(`${this.apiUrl}/approved`);
  }

  getDraftsByFolder(folderName: string): Observable<ContentDraft[]> {
    return this.http.get<ContentDraft[]>(`${this.apiUrl}/by-folder/${encodeURIComponent(folderName)}`);
  }

  approveDraft(id: string): Observable<ContentDraft> {
    return this.http.patch<ContentDraft>(`${this.apiUrl}/${id}/approve`, {});
  }

  rejectDraft(id: string): Observable<ContentDraft> {
    return this.http.patch<ContentDraft>(`${this.apiUrl}/${id}/reject`, {});
  }

  updateDraft(id: string, update: UpdateDraftRequest): Observable<ContentDraft> {
    return this.http.put<ContentDraft>(`${this.apiUrl}/${id}`, update);
  }
}
