import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../services/card.service';
import { DeckService } from '../services/deck.service';
import { Card } from '../_dto/Card';
import { Deck } from '../_dto/Deck';
import * as Highcharts from 'highcharts';
import { TranslateService } from '@ngx-translate/core';
import { StopwatchService } from '../services/stopwatch.service';
import { Assessment, TrainInsight } from '../_dto/Insights';

@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.scss'],
})
export class TrainComponent implements OnInit {
  get deck_id(): number {
    return parseInt(this.activatedRoute.snapshot.paramMap.get('deck_id') ?? '');
  }
  state: 'start' | 'train' = 'start';
  flipped = true;
  deck?: Deck;
  cards?: Card[];
  insights: TrainInsight[] = [];
  currentCard?: Card;

  weights = [8, 13, 26, 51, 100];

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
    this.state = 'train';
    this.currentCard = this.getNextCard();
    this.flipped = false;
  }

  flipCard() {
    this.flipped = true;
  }

  nextCard(assessment: Assessment) {
    const currentInsight: TrainInsight = this.insights.find(
      (i) => i.cardId === this.currentCard!.id
    ) || { cardId: this.currentCard!.id!, assessment };
    currentInsight.assessment = assessment;

    this.insights = [...this.insights, currentInsight];

    this.currentCard = this.getNextCard();
    this.flipped = false;
  }

  private getNextCard() {
    // prefer unrated cards
    const unratedCards = this.cards!.filter((card) =>
      this.insights.every((insight) => insight.cardId !== card.id)
    );
    if (unratedCards && unratedCards.length > 0) {
      const id = Math.floor(Math.random() * unratedCards.length);
      return unratedCards[id];
    } else {
      const weightedCardIds: number[][] = [];
      this.insights!.forEach((insight) => {
        // skid currentCard
        if (this.currentCard && insight.cardId == this.currentCard.id) {
        } else {
          weightedCardIds.push(
            Array(this.weights[insight.assessment]).fill(insight.cardId)
          );
        }
      });
      const flatWeightedCardIds = weightedCardIds.flat();

      const id =
        flatWeightedCardIds[
          Math.floor(Math.random() * flatWeightedCardIds.length)
        ];
      return this.cards!.find((card) => card.id === id);
    }
  }
}
