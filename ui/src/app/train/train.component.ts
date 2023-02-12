import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../services/card.service';
import { DeckService } from '../services/deck.service';
import { Card } from '../_dto/Card';
import { Deck } from '../_dto/Deck';
import { Assessment, TrainInsight } from '../_dto/Insights';
import { FormBuilder, FormGroup } from '@angular/forms';
import { pick } from 'highcharts';

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

  weightForm: FormGroup = this.formBuilder.group({
    Good: 8,
    RatherGood: 13,
    Neutral: 26,
    RatherBad: 51,
    Bad: 100,
    balancedMode: true,
  });

  constructor(
    private readonly cardService: CardService,
    private readonly deckService: DeckService,
    private readonly formBuilder: FormBuilder,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.deckService.get(this.deck_id).subscribe((deck) => {
      this.deck = deck;
    });

    this.cardService.getAll(this.deck_id).subscribe((cards) => {
      this.cards = cards;
    });

    // SMELL: Get this from indexedDb insights one day
    const s = window.localStorage.getItem('train_' + this.deck_id) ?? '[]';
    this.insights = JSON.parse(s);
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

    // SMELL: Store this in indexedDb insights one day
    window.localStorage.setItem(
      'train_' + this.deck_id,
      JSON.stringify(this.insights)
    );

    this.currentCard = this.getNextCard();
    this.flipped = false;
  }

  private getNextCard(): Card {
    // prefer unrated cards
    const unratedCards = this.cards!.filter((card) =>
      this.insights.every((insight) => insight.cardId !== card.id)
    );
    if (unratedCards && unratedCards.length > 0) {
      const id = Math.floor(Math.random() * unratedCards.length);
      return unratedCards[id];
    } else {
      const balancedMode = this.weightForm.get('balancedMode')?.value;
      if (balancedMode) {
        const weightedCardIds: number[][] = [];
        this.insights!.forEach((insight) => {
          // skip currentCard
          if (this.currentCard && insight.cardId == this.currentCard.id) {
          } else {
            weightedCardIds.push(
              Array(
                this.weightForm.get(Assessment[insight.assessment])?.value
              ).fill(insight.cardId)
            );
          }
        });

        const flatWeightedCardIds = weightedCardIds.flat();
        const pickAt = Math.floor(Math.random() * flatWeightedCardIds.length);
        const id = flatWeightedCardIds[pickAt];
        return this.cards!.find((card) => card.id === id)!;
      } else {
        const asses: number[][] = [];
        for (const assString in Assessment) {
          const ass = parseInt(assString);
          if (!isNaN(ass)) {
            const assWeight = parseInt(
              this.weightForm.get(Assessment[ass])?.value
            );
            asses.push(Array(assWeight).fill(ass));
          }
        }
        const flatAsses = asses.flat();
        const pickAt = Math.floor(Math.random() * flatAsses.length);
        let nextAss = flatAsses[pickAt];

        while (true) {
          const nextCandidates = this.insights?.filter(
            (c) => c.assessment === nextAss
          );
          if (nextCandidates && nextCandidates.length > 0) {
            const pickAtCandidate = Math.floor(
              Math.random() * nextCandidates.length
            );
            const nextCandidate = nextCandidates[pickAtCandidate];
            return this.cards!.find(
              (card) => card.id === nextCandidate.cardId
            )!;
          } else {
            return this.getNextCard();
          }
        }
      }
    }
  }
}
