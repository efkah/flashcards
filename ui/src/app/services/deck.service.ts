import { Injectable } from '@angular/core';
import { liveQuery } from 'dexie';
import { from, Observable, switchMap } from 'rxjs';
import { CreateDeck, Deck } from '../_dto/Deck';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  constructor(private readonly dbService: DbService) {}

  getAll(): Observable<Deck[]> {
    // SMELL: use from(liveQuery(() => this.dbService.decks.toArray()))
    return from(this.dbService.decks.toArray());
  }

  add(createDeck: CreateDeck): Observable<Deck | undefined> {
    return from(this.dbService.decks.add(createDeck)).pipe(
      switchMap((id) => from(this.dbService.decks.get({ id: id })))
    );
  }

  get(deck_id: number): Observable<Deck | undefined> {
    return from(this.dbService.decks.get({ id: deck_id }));
  }

  update(updateDeck: Deck): Observable<Deck | undefined> {
    return from(this.dbService.decks.update(updateDeck.id!, updateDeck)).pipe(
      switchMap((id) => from(this.dbService.decks.get({ id: id })))
    );
  }

  delete(deck_id: number): Observable<void> {
    return from(this.dbService.decks.delete(deck_id));
  }
}
