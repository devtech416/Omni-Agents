import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ContentDraft, ContentDraftsService } from '../../../../core/services/content-drafts.service';

@Component({
  selector: 'app-content-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './content-card.component.html',
  styleUrls: ['./content-card.component.css']
})
export class ContentCardComponent implements OnInit {
  @Input() draft!: ContentDraft;
  @Output() removed = new EventEmitter<string>();

  localContent: string = '';
  private contentSubject = new Subject<string>();
  isSaving = false;
  isActionLoading = false;

  constructor(private draftsService: ContentDraftsService) {}

  ngOnInit() {
    this.localContent = this.draft.content || '';
    
    // Auto-save logic for the textarea
    this.contentSubject.pipe(
      debounceTime(1000), // wait 1s after last keystroke
      distinctUntilChanged()
    ).subscribe(newContent => {
      this.saveContent(newContent);
    });
  }

  onContentChange(newContent: string) {
    this.localContent = newContent;
    this.contentSubject.next(newContent);
  }

  saveContent(content: string) {
    if (this.draft.content === content) return;
    
    this.isSaving = true;
    this.draftsService.updateDraft(this.draft.id, { content }).subscribe({
      next: (updated) => {
        this.draft.content = updated.content;
        this.isSaving = false;
      },
      error: (err) => {
        console.error('Error auto-saving content', err);
        this.isSaving = false;
      }
    });
  }

  approve() {
    this.isActionLoading = true;
    this.draftsService.approveDraft(this.draft.id).subscribe({
      next: () => {
        this.removed.emit(this.draft.id);
        this.isActionLoading = false;
      },
      error: (err) => {
        console.error('Error approving draft', err);
        this.isActionLoading = false;
      }
    });
  }

  reject() {
    this.isActionLoading = true;
    this.draftsService.rejectDraft(this.draft.id).subscribe({
      next: () => {
        this.removed.emit(this.draft.id);
        this.isActionLoading = false;
      },
      error: (err) => {
        console.error('Error rejecting draft', err);
        this.isActionLoading = false;
      }
    });
  }

  downloadImage() {
    if (!this.draft.imageUrl) return;
    
    // Create a temporary link element to trigger the download
    const link = document.createElement('a');
    link.href = this.draft.imageUrl;
    // Set a default filename based on the topic or id
    const cleanTopic = this.draft.topic ? this.draft.topic.substring(0, 20).replace(/\s+/g, '-') : 'draft';
    link.download = `agentminds-${cleanTopic}-${this.draft.id.substring(0, 5)}.png`;
    // Setting target to _blank helps if the download attribute is ignored due to CORS
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
