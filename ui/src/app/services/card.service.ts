import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  filter,
  first,
  from,
  map,
  Observable,
  of,
  ReplaySubject,
  Subject,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { Card, CreateCard } from '../_dto/Card';
import { ManageService } from './manage.service';
import { DbService } from './db.service';
import { liveQuery } from 'dexie';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  // cards$ = liveQuery(() => this.dbService.cards);
  // cards: Card[] = [];
  // private cards$ = new ReplaySubject<Card[]>(1);

  constructor(private readonly dbService: DbService) {}

  getAll(deckId: number): Observable<Card[]> {
    console.info('getAll', deckId);
    return from(
      liveQuery(() => this.dbService.cards.where({ deck_id: deckId }).toArray())
    );
  }

  add(createCard: CreateCard): Observable<Card> {
    // this.cards.push({
    //   ...createCard,
    //   id: uuidv4(),
    //   sync: 'Add',
    // });
    // this.syncronize$?.next();
    // return of(this.cards[this.cards.length - 1]);
    return of();
  }

  get(card_id: number): Observable<Card> {
    // const selected = this.cards.filter((card) => card.id === card_id);
    // if (selected.length !== 1) {
    //   throw throwError(() => new Error());
    // }
    // return of(selected[0]);
    return of();
  }

  update(updateCard: Card): Observable<Card> {
    // const store_id = this.cards.findIndex((card) => card.id === updateCard.id);
    // updateCard.sync = this.cards[store_id].sync === 'Add' ? 'Add' : 'Update';
    // this.cards[store_id] = updateCard;
    // this.syncronize$?.next();
    // return of(this.cards[store_id]);
    return of();
  }

  delete(card_id: number): Observable<Card> {
    // const deleting = this.cards.filter((card) => card.id === card_id);
    // if (deleting.length !== 1) {
    //   throw throwError(() => new Error());
    // }
    // deleting[0].sync = 'Delete';
    // this.syncronize$?.next();
    // return of(deleting[0]);
    return of();
  }

  syncronize() {
    // this.syncronize$.next();
  }

  claimAll() {
    // this.cards.forEach((card) => {
    //   card.sync = 'Add';
    // });
    // this.syncronize$.next();
  }

  removeAll() {
    // this.cards = [];
    // this.syncronize$.next();
  }
}
