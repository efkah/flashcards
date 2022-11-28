import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from 'src/app/services/card.service';
import { Card } from 'src/app/_dto/Card';

@Component({
  selector: 'app-card-edit',
  templateUrl: './card-edit.component.html',
  styleUrls: ['./card-edit.component.scss'],
})
export class CardEditComponent implements OnInit {
  get card_id(): string {
    return this.activatedRoute.snapshot.paramMap.get('card_id') ?? '';
  }

  get deck_id(): string {
    return this.activatedRoute.snapshot.paramMap.get('deck_id') ?? '';
  }

  card?: Card;
  showMarkdownForAnswer = false;
  showMarkdownForQuestion = false;
  confirmDelete = false;
  editForm?: FormGroup;

  constructor(
    private readonly cardService: CardService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.cardService.get(this.card_id).subscribe((card) => {
      this.card = card;
      this.resetForm();
    });

    this.editForm?.controls['question'].valueChanges.subscribe((_) => {
      this.showMarkdownForQuestion = false;
    });
    this.editForm?.controls['answer'].valueChanges.subscribe((_) => {
      this.showMarkdownForAnswer = false;
    });
  }

  submitEditForm() {
    this.editForm?.markAllAsTouched();
    if (!this.editForm?.valid) {
      return;
    }

    this.cardService.update(this.editForm.value).subscribe((card) => {
      this.router.navigate([`decks/${this.deck_id}`]);
      this.snackBar.open(`Updated Card!`, 'Close', { duration: 1800 });
    });
  }

  deleteCard() {
    this.confirmDelete = true;
  }

  confirmDeleteCard(card_id: string) {
    this.cardService.delete(card_id!).subscribe((card) => {
      this.snackBar.open(`Card deleted`, 'Close', {
        duration: 1800,
      });
      this.router.navigate(['decks']);
    });
  }

  resetForm() {
    this.editForm = this.formBuilder.group({
      question: [this.card?.question, [Validators.required]],
      answer: [this.card?.answer, [Validators.required]],
      id: this.card?.id,
      deck_id: this.card?.deck_id,
    });
  }
}
