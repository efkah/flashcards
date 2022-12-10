import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from 'src/app/services/card.service';
import { DeckService } from 'src/app/services/deck.service';
import { Card } from 'src/app/_dto/Card';
import { Deck } from 'src/app/_dto/Deck';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss'],
})
export class CardViewComponent implements OnInit {
  get card_id(): number {
    return parseInt(this.activatedRoute.snapshot.paramMap.get('card_id') ?? '');
  }

  get deck_id(): number {
    return parseInt(this.activatedRoute.snapshot.paramMap.get('deck_id') ?? '');
  }

  flipped = false;
  deck?: Deck;
  card?: Card;

  constructor(
    private readonly cardService: CardService,
    private readonly deckService: DeckService,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.deckService.get(this.deck_id).subscribe((deck) => {
      this.deck = deck;
    });

    this.cardService.get(this.card_id).subscribe((card) => {
      this.card = card;
    });
  }

  flipCard() {
    this.flipped = !this.flipped;
  }
}
