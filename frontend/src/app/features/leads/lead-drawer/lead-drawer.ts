import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeadResponse } from '../../../core/services/leads.service';

@Component({
  selector: 'app-lead-drawer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lead-drawer.html',
  styleUrl: './lead-drawer.css'
})
export class LeadDrawerComponent {
  @Input() lead: LeadResponse | null = null;
  @Output() close = new EventEmitter<void>();

  get firstName(): string {
    if (!this.lead) return 'there';
    const name = this.lead.fullName || this.lead.instagramHandle;
    return name ? name.split(' ')[0] : 'there';
  }

  onClose() {
    this.close.emit();
  }
}
