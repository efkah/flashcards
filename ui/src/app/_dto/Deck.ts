export interface CreateDeck {
  name: string;
  description: string;
  owner: string;
  sync: 'None' | 'Add' | 'Update' | 'Delete';
}

export interface Deck extends CreateDeck {
  id: string;
}
