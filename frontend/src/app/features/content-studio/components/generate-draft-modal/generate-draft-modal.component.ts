import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContentDraftsService, ContentDraft } from '../../../../core/services/content-drafts.service';

@Component({
  selector: 'app-generate-draft-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './generate-draft-modal.component.html',
  styleUrls: ['./generate-draft-modal.component.css']
})
export class GenerateDraftModalComponent {
  @Input() categories: string[] = [];
  @Output() closeModal = new EventEmitter<void>();
  @Output() generated = new EventEmitter<ContentDraft>();

  topic: string = '';
  referenceImageUrl: string = '';
  selectedFolder: string = '';
  newCategory: string = '';
  selectedEngine: 'DALL-E' | 'CANVA' = 'CANVA'; // Defaulting to Canva

  isGenerating = false;
  errorMsg = '';

  constructor(private draftsService: ContentDraftsService) {}

  generate() {
    if (!this.topic.trim()) {
      this.errorMsg = 'Debes describir la imagen que quieres generar.';
      return;
    }

    this.isGenerating = true;
    this.errorMsg = '';

    const req = {
      topic: this.topic,
      referenceImageUrl: this.referenceImageUrl,
      folder: this.selectedFolder,
      category: this.newCategory,
      engine: this.selectedEngine
    };

    this.draftsService.generateDraft(req).subscribe({
      next: (draft) => {
        this.isGenerating = false;
        this.generated.emit(draft);
      },
      error: (err) => {
        console.error('Error generating draft', err);
        this.errorMsg = 'Ocurrió un error al contactar a la IA. Inténtalo de nuevo.';
        this.isGenerating = false;
      }
    });
  }

  cancel() {
    if (!this.isGenerating) {
      this.closeModal.emit();
    }
  }
}
