export interface CreateCard {
  question: string;
  answer: string;
  deck_id: number;
  assessment?: 'None' | 'Bad' | 'Good' | 'Perfect';
  time_answered?: Date;
}

export interface Card extends CreateCard {
  id?: number;
}
