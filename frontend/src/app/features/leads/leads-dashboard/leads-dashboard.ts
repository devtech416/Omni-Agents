import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeadsTableComponent } from '../leads-table/leads-table';
import { LeadDrawerComponent } from '../lead-drawer/lead-drawer';
import { LeadResponse } from '../../../core/services/leads.service';

@Component({
  selector: 'app-leads-dashboard',
  standalone: true,
  imports: [CommonModule, LeadsTableComponent, LeadDrawerComponent],
  templateUrl: './leads-dashboard.html',
  styleUrl: './leads-dashboard.css'
})
export class LeadsDashboardComponent {
  selectedLead: LeadResponse | null = null;
  totalLeads = 0;
  hotLeads = 0;
  conversionRate = 0;

  openDrawer(lead: LeadResponse) {
    this.selectedLead = lead;
  }

  closeDrawer() {
    this.selectedLead = null;
  }

  onDataLoaded(leads: LeadResponse[]) {
    this.totalLeads = leads.length;
    this.hotLeads = leads.filter(l => l.status === 'NEW' || l.priorityScore >= 80).length;
    this.conversionRate = this.totalLeads > 0 ? (leads.filter(l => l.status === 'CONVERTED').length / this.totalLeads) * 100 : 0;
  }
}
