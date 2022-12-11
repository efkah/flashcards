import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../services/card.service';
import { DeckService } from '../services/deck.service';
import { Card } from '../_dto/Card';
import { Deck } from '../_dto/Deck';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  get deck_id(): number {
    return parseInt(this.activatedRoute.snapshot.paramMap.get('deck_id') ?? '');
  }
  state: 'start' | 'quiz' | 'end' = 'start';
  flipped = true;
  deck?: Deck;
  cards?: Card[];
  currentCard?: Card;

  quizData: any[] = [];

  constructor(
    private readonly cardService: CardService,
    private readonly deckService: DeckService,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.deckService.get(this.deck_id).subscribe((deck) => {
      this.deck = deck;
    });

    this.cardService.getAll(this.deck_id).subscribe((cards) => {
      this.cards = cards;
    });
  }

  start() {
    this.state = 'quiz';
    this.nextCard(false);
    // TODO: start timer
  }
  stop() {
    // TODO: Stop the timer
    this.state = 'end';
  }
  flipCard() {
    this.flipped = true;
    // TODO: pause timer
  }
  nextCard(answer: boolean) {
    if (this.currentCard) {
      this.quizData.push({
        cardId: this.currentCard.id,
        time: 0,
        answer,
      });
    }

    if (this.cards && this.cards.length > 0) {
      const id = Math.floor(Math.random() * this.cards.length);

      this.currentCard = this.cards.splice(id, 1)[0];
      this.flipped = false;
      // TODO: restart time
    } else {
      this.stop();
    }
  }
}
