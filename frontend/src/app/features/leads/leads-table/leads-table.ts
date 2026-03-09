import { Component, EventEmitter, Output, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeadsService, LeadResponse } from '../../../core/services/leads.service';

@Component({
  selector: 'app-leads-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leads-table.html',
  styleUrl: './leads-table.css'
})
export class LeadsTableComponent implements OnInit {
  @Output() rowClick = new EventEmitter<LeadResponse>();
  private leadsService = inject(LeadsService);
  private cdr = inject(ChangeDetectorRef);
  
  leads: LeadResponse[] = [];
  isLoading = true;

  ngOnInit() {
    this.leadsService.getLeads().subscribe({
      next: (data) => {
        this.leads = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to fetch leads:', err);
        this.isLoading = false;
        this.leads = [];
        this.cdr.detectChanges();
      }
    });
  }

  onRowClick(lead: LeadResponse) {
    this.rowClick.emit(lead);
  }
}

