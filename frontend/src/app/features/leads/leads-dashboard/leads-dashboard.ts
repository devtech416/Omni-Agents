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

  openDrawer(lead: LeadResponse) {
    this.selectedLead = lead;
  }

  closeDrawer() {
    this.selectedLead = null;
  }
}
