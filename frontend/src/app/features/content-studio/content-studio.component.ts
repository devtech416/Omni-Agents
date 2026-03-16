import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContentDraftsService, ContentDraft } from '../../core/services/content-drafts.service';
import { ContentCardComponent } from './components/content-card/content-card.component';
import { GenerateDraftModalComponent } from './components/generate-draft-modal/generate-draft-modal.component';

@Component({
  selector: 'app-content-studio',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ContentCardComponent,
    GenerateDraftModalComponent
  ],
  templateUrl: './content-studio.component.html',
  styleUrls: ['./content-studio.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContentStudioComponent implements OnInit {
  drafts: ContentDraft[] = [];
  categories: string[] = ['Diaram', 'Educación', 'Trading', 'Humor'];
  
  currentView: 'PENDING' | 'APPROVED' | 'FOLDER' = 'PENDING';
  currentFolder: string = '';
  
  isModalOpen = false;

  constructor(private contentDraftsService: ContentDraftsService) {}

  ngOnInit(): void {
    this.loadPendingDrafts();
  }

  loadPendingDrafts() {
    this.currentView = 'PENDING';
    this.currentFolder = '';
    this.contentDraftsService.getPendingDrafts().subscribe({
      next: (res: ContentDraft[]) => this.drafts = res,
      error: (err: any) => console.error('Error fetching pending drafts', err)
    });
  }

  loadApprovedDrafts() {
    this.currentView = 'APPROVED';
    this.currentFolder = '';
    this.contentDraftsService.getApprovedDrafts().subscribe({
      next: (res: ContentDraft[]) => this.drafts = res,
      error: (err: any) => console.error('Error fetching approved drafts', err)
    });
  }

  loadFolder(folder: string) {
    this.currentView = 'FOLDER';
    this.currentFolder = folder;
    this.contentDraftsService.getDraftsByFolder(folder).subscribe({
      next: (res: ContentDraft[]) => this.drafts = res,
      error: (err: any) => console.error(`Error fetching drafts for folder ${folder}`, err)
    });
  }

  openGenerateModal() {
    this.isModalOpen = true;
  }

  closeGenerateModal() {
    this.isModalOpen = false;
  }

  onDraftGenerated(newDraft: any) {
    this.closeGenerateModal();
    // Prepend the new draft if we are viewing pending drafts or its specific folder
    if (this.currentView === 'PENDING' || (this.currentView === 'FOLDER' && this.currentFolder === newDraft.folder)) {
      this.drafts = [newDraft, ...this.drafts];
    }
  }

  onDraftRemoved(draftId: any) {
    this.drafts = this.drafts.filter(d => d.id !== draftId);
  }
}
