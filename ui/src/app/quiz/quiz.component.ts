import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../services/card.service';
import { DeckService } from '../services/deck.service';
import { Card } from '../_dto/Card';
import { Deck } from '../_dto/Deck';
import { TranslateService } from '@ngx-translate/core';
import { StopwatchService } from '../services/stopwatch.service';

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
  time: number = 0;
  quizData: any[] = [];

  percentageGood = 0;
  percentageBad = 0;

  constructor(
    private readonly cardService: CardService,
    private readonly deckService: DeckService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly translateService: TranslateService,
    private readonly stopwatchService: StopwatchService
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
  }

  flipCard() {
    this.flipped = true;
    this.stopwatchService.pause();
  }
  nextCard(answer: boolean) {
    if (this.currentCard) {
      this.quizData.push({
        cardId: this.currentCard.id,
        time: this.stopwatchService.getLastTime(),
        answer,
      });
    }

    if (this.cards && this.cards.length > 0) {
      const id = Math.floor(Math.random() * this.cards.length);

      this.currentCard = this.cards.splice(id, 1)[0];
      this.flipped = false;
      this.stopwatchService.start();
    } else {
      this.stop();
    }
  }

  stop() {
    this.time = Math.ceil(this.stopwatchService.getAllTime() / 100) / 10;
    this.state = 'end';
    this.stopwatchService.clear();

    this.percentageBad =
      (this.quizData.filter((x) => x.answer === false).length /
        this.quizData.length) *
      100;
    this.percentageGood =
      (this.quizData.filter((x) => x.answer === true).length /
        this.quizData.length) *
      100;
  }
}
