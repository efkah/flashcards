import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { DeckService } from '../services/deck.service';
import { Deck } from '../_dto/Deck';

@Component({
  selector: 'app-decks',
  templateUrl: './deck-list.component.html',
  styleUrls: ['./deck-list.component.scss'],
})
export class DeckListComponent implements OnInit {
  decks: Deck[] = [];
  createForm?: FormGroup;
  isCreateFormVisible = false;

  constructor(
    private readonly deckService: DeckService,
    private readonly snackBar: MatSnackBar,
    private readonly formBuilder: FormBuilder,
    private readonly elementRef: ElementRef,
    private readonly translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.deckService.getAll().subscribe((decks) => {
      this.decks = decks;
    });

    this.resetForm();
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

    this.deckService.add(this.createForm.value).subscribe((deck) => {
      if (deck) {
        this.isCreateFormVisible = false;
        this.resetForm();
        this.decks.push(deck);
        this.snackBar.open(
          this.translateService.instant('deckList.snackBar.added'),
          this.translateService.instant('common.close'),
          { duration: 1800 }
        );
      }
    });
  }

  private resetForm() {
    this.createForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      description: null,
    });
  }
}
