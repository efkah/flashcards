import { Injectable } from '@angular/core';
import { liveQuery } from 'dexie';
import { from, Observable, of, switchMap } from 'rxjs';
import { Card, CreateCard } from '../_dto/Card';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  constructor(private readonly dbService: DbService) {}

  getAll(deckId: number): Observable<Card[]> {
    // SMELL: use liveQuery(() => this.dbService.cards.where({ deck_id: deckId }).toArray())
    return from(this.dbService.cards.where({ deck_id: deckId }).toArray());
  }

  add(createCard: CreateCard): Observable<Card | undefined> {
    return from(this.dbService.cards.add(createCard)).pipe(
      switchMap((id) => from(this.dbService.cards.get({ id: id })))
    );
  }

  get(card_id: number): Observable<Card | undefined> {
    return from(this.dbService.cards.get({ id: card_id }));
  }

  update(updateCard: Card): Observable<Card | undefined> {
    return from(this.dbService.cards.update(updateCard.id!, updateCard)).pipe(
      switchMap((id) => from(this.dbService.cards.get({ id: id })))
    );
  }

  delete(card_id: number): Observable<void> {
    return from(this.dbService.cards.delete(card_id));
  }
}
