export interface Insight {
  cardId: number;
}

export interface TrainInsight extends Insight {
  assessment: Assessment;
}

export enum Assessment {
  Good = 0,
  RatherGood,
  Neutral,
  RatherBad,
  Bad,
}
