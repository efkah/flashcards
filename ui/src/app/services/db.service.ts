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
        question: 'How do you **advance** to **next card**?',
        answer: 'Just assess your performance below.',
      },
      {
        deck_id,
        question: 'Whats happening when **all cards are shown** in a **quiz**?',
        answer: 'The quiz will stop and show me how i done.',
      },
      {
        deck_id,
        question:
          'Whats happening when **all cards are shown** in a **training session**?',
        answer:
          'It will show me cards i have done **good** with **less** and cards i have **problems** with **more often**.',
      },
      {
        deck_id,
        question: 'What is the *most important thing about learning*?',
        answer: '*Have enough sleep*',
      },
      {
        deck_id,
        question: 'How can i `add cards` to a deck?',
        answer:
          'Just click `"EDIT"`, <br/> then scroll to bottom <br/> and click `"+ ADD NEW CARD"`',
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

  async exportAsJSON(): Promise<string> {
    const decks = await this.decks.toArray();
    const cards = await this.cards.toArray();
    return JSON.stringify({ decks, cards });
  }

  async populateFromJSON(data: any) {
    await this.transaction('rw', 'decks', 'cards', async () => {
      this.decks.clear();
      this.cards.clear();
      await this.decks.bulkAdd(data.decks);
      await this.cards.bulkAdd(data.cards);
    });
  }
}
