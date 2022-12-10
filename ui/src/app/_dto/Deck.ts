export interface CreateDeck {
  name: string;
  description: string;
  owner: string;
}

export interface Deck extends CreateDeck {
  id: string;
}
