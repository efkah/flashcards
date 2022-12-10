export interface CreateDeck {
  name: string;
  description: string;
}

export interface Deck extends CreateDeck {
  id?: number;
}
