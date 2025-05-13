import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddedMatch, Match, MatchStatus } from '../../Interfaces/Match';

@Component({
  selector: 'app-match-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './match-modal.component.html',
  styleUrls: ['./match-modal.component.css']
})
export class MatchModalComponent implements OnChanges {
  @Input() isOpen = false;
  @Input() isEditMode = false;
  @Input() matchToRegister: AddedMatch | null = null;
  @Input() matchToEdit: Match | null = null;
  @Output() closeModal = new EventEmitter<void>();
  @Output() addMatch = new EventEmitter<AddedMatch>();
  @Output() editMatch = new EventEmitter<Match>();

  matchForm: FormGroup;
  matchStatuses = MatchStatus;

  constructor(private fb: FormBuilder) {
    this.matchForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      competition: ['', [Validators.required]],
      date: ['', [Validators.required]],
      status: [MatchStatus.Live, [Validators.required]],
      duration: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnChanges() {
    
    if (this.matchToEdit && this.isEditMode) {
      const matchDate = new Date(this.matchToEdit.date);
      const formattedDateTime = matchDate.toISOString().slice(0, 16);

      this.matchForm.patchValue({
        title: this.matchToEdit.title,
        competition: this.matchToEdit.competition,
        date: formattedDateTime,
        status: this.matchToEdit.status,
        duration: this.matchToEdit.duration
      });
    } else {
      this.matchForm.reset({
        status: MatchStatus.Live,
        duration: 0
      });
    }
  }

  close() {
    this.closeModal.emit();
  }

  onSubmit() {
    if (this.matchForm.valid) {
      const formValue = this.matchForm.value;

      console.log(formValue);

      if (this.isEditMode) {
        const matchData: Match = {
          id: this.matchToEdit?.id ?? '',
          title: formValue.title,
          competition: formValue.competition,
          date: new Date(formValue.date),
          status: formValue.status,
          duration: formValue.duration
        };
        
        this.editMatch.emit(matchData);
      }
       else {
        const matchData: AddedMatch = {
          title: formValue.title,
          competition: formValue.competition,
          date: new Date(formValue.date),
          status: formValue.status,
          duration: formValue.duration
        };
        this.addMatch.emit(matchData);
        console.log(formValue);

      }
    }
  }
} 