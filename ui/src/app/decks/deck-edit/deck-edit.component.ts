import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CardService } from 'src/app/services/card.service';
import { DeckService } from 'src/app/services/deck.service';
import { Card } from 'src/app/_dto/Card';

@Component({
  selector: 'app-edit',
  templateUrl: './deck-edit.component.html',
  styleUrls: ['./deck-edit.component.scss'],
})
export class DeckEditComponent implements OnInit {
  get deck_id(): number {
    return parseInt(this.activatedRoute.snapshot.paramMap.get('deck_id') ?? '');
  }

  cards: Card[] = [];
  createForm?: FormGroup;
  editForm?: FormGroup;
  isCreateFormVisible = false;
  confirmDelete = false;
  showMarkdownForQuestion = false;
  showMarkdownForAnswer = false;

  constructor(
    private readonly deckService: DeckService,
    private readonly cardService: CardService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly snackBar: MatSnackBar,
    private readonly formBuilder: FormBuilder,
    private readonly elementRef: ElementRef,
    private readonly translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.cardService.getAll(this.deck_id).subscribe((cards) => {
      this.cards = cards;
    });

    this.resetForm();

    this.deckService.get(this.deck_id).subscribe((deck) => {
      if (deck) {
        this.editForm = this.formBuilder.group({
          name: [deck.name, [Validators.required]],
          description: deck.description,
          id: deck.id,
        });
      }
    });

    this.createForm?.controls['question'].valueChanges.subscribe((_) => {
      this.showMarkdownForQuestion = false;
    });
    this.createForm?.controls['answer'].valueChanges.subscribe((_) => {
      this.showMarkdownForAnswer = false;
    });
  }

  showCreateForm() {
    this.isCreateFormVisible = true;

    setTimeout(() => {
      this.elementRef.nativeElement.parentElement.scrollTo({
        left: 0,
        top: this.elementRef.nativeElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 0);
  }

  submitCreateForm() {
    this.createForm?.markAllAsTouched();
    if (!this.createForm?.valid) {
      return;
    }

    this.cardService.add(this.createForm.value).subscribe((card) => {
      if (card) {
        this.isCreateFormVisible = false;
        this.resetForm();
        this.cards.push(card);
        this.snackBar.open(
          this.translateService.instant('deckEdit.snackBar.added'),
          this.translateService.instant('common.close'),
          { duration: 1800 }
        );
      }
    });
  }

  submitEditForm() {
    this.editForm?.markAllAsTouched();
    if (!this.editForm?.valid) {
      return;
    }

    this.deckService.update(this.editForm.value).subscribe((deck) => {
      this.router.navigate(['decks']);
      this.snackBar.open(
        this.translateService.instant('deckEdit.snackBar.updated'),
        this.translateService.instant('common.close'),
        { duration: 1800 }
      );
    });
  }

  deleteDeck() {
    this.confirmDelete = true;
  }

  confirmDeleteDeck(deck_id: number) {
    this.deckService.delete(deck_id!).subscribe((_) => {
      this.snackBar.open(
        this.translateService.instant('deckEdit.snackBar.deleted'),
        this.translateService.instant('common.close'),
        {
          duration: 1800,
        }
      );
      this.router.navigate(['decks']);
    });
  }

  private resetForm() {
    this.createForm = this.formBuilder.group({
      question: [null, [Validators.required]],
      answer: [null, [Validators.required]],
      deck_id: this.deck_id,
    });
  }
}
