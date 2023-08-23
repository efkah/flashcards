import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { TrainInsight } from 'src/app/_dto/Insights';

@Component({
  selector: 'app-train-insights',
  templateUrl: './train-insights.component.html',
  styleUrls: ['./train-insights.component.scss'],
})
export class TrainInsightsComponent implements OnChanges {
  @Input() data: TrainInsight[] = [];
  @Input() cardsCount?: number;

  bad = 0;
  ratherBad = 0;
  neutral = 0;
  ratherGood = 0;
  good = 0;
  unrated = 0;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.info('change', changes['data'].firstChange);
    this.bad = this.data.filter((x) => x.assessment === 4).length;
    this.ratherBad = this.data.filter((x) => x.assessment === 3).length;
    this.neutral = this.data.filter((x) => x.assessment === 2).length;
    this.ratherGood = this.data.filter((x) => x.assessment === 1).length;
    this.good = this.data.filter((x) => x.assessment === 0).length;
    this.unrated = this.cardsCount ? this.cardsCount - this.data.length : 0;
  }
}
