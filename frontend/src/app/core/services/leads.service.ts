import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LeadResponse {
  id: string;
  instagramHandle: string;
  fullName: string | null;
  status: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'DISQUALIFIED' | 'CONVERTED';
  priorityScore: number;
  aiSummary: string | null;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class LeadsService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3014/leads';

  getLeads(): Observable<LeadResponse[]> {
    return this.http.get<LeadResponse[]>(this.apiUrl);
  }
}
