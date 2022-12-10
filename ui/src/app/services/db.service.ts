import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { Card } from '../_dto/Card';
import { Deck } from '../_dto/Deck';

@Injectable({
  providedIn: 'root',
})
export class DbService extends Dexie {
  decks!: Table<Deck, number>;
  cards!: Table<Card, number>;

  constructor() {
    super('Fk.Flashcards');
    this.version(1).stores({
      decks: '++id',
      cards: '++id, deck_id',
    });
    this.on('populate', () => this.populate());
  }

  async populate() {
    const deck_id = await this.decks.add({
      name: 'Flashcards',
      description: 'Learn how to use this app',
    });
    await this.cards.bulkAdd([
      {
        deck_id,
        question: 'Feed the birds',
        answer: 'Feed the birds',
      },
      {
        deck_id,
        question: 'Watch a movie',
        answer: 'Watch a movie',
      },
      {
        deck_id,
        question: 'Have some sleep',
        answer: 'Have some sleep',
      },
    ]);
  }

  async resetDatabase() {
    await this.transaction('rw', 'decks', 'cards', () => {
      this.decks.clear();
      this.cards.clear();
      this.populate();
    });
  }
}
