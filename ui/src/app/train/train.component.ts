import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../services/card.service';
import { DeckService } from '../services/deck.service';
import { Card } from '../_dto/Card';
import { Deck } from '../_dto/Deck';
import * as Highcharts from 'highcharts';
import { TranslateService } from '@ngx-translate/core';
import { StopwatchService } from '../services/stopwatch.service';

@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.scss'],
})
export class TrainComponent implements OnInit {
  get deck_id(): number {
    return parseInt(this.activatedRoute.snapshot.paramMap.get('deck_id') ?? '');
  }
  state: 'start' | 'train' | 'end' = 'start';
  flipped = true;
  deck?: Deck;
  cards?: Card[];
  currentCard?: Card;
  time: number = 0;
  trainData: any[] = [];

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
    this.state = 'train';
    this.nextCard(false);
  }

  flipCard() {
    this.flipped = true;
    this.stopwatchService.pause();
  }
  nextCard(answer: boolean) {
    if (this.currentCard) {
      this.trainData.push({
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

    const chartOptions: Highcharts.Options = {
      chart: {
        backgroundColor: 'rgba(0,0,0,0)',
        plotBorderWidth: undefined,
        plotShadow: false,
        type: 'pie',
      },
      title: {
        text: '',
        align: 'left',
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            distance: -34,
          },
        },
      },
      series: [
        {
          colorByPoint: true,
          data: [
            {
              name: this.trainData.some((x) => x.answer === false)
                ? this.translateService.instant(
                    'train.train.selfAssessment.bad'
                  )
                : '',
              y: this.trainData.filter((x) => x.answer === false).length,
              // @ts-ignore
              sliced: true,
              color: '#E94354',
            },
            {
              name: this.trainData.some((x) => x.answer === true)
                ? this.translateService.instant(
                    'train.train.selfAssessment.good'
                  )
                : '',
              y: this.trainData.filter((x) => x.answer === true).length,
              color: '#6D8C00',
            },
          ],
        },
      ],
      credits: {
        enabled: false,
      },
    };
    Highcharts.chart('container', chartOptions);
  }
}
