export interface CreateCard {
  question: string;
  answer: string;
  deck_id: string;
  owner: string;
  assessment?: 'None' | 'Bad' | 'Good' | 'Perfect';
  time_answered?: Date;
}

export interface Card extends CreateCard {
  id: string;
}
