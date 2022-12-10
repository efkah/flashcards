import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  filter,
  first,
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
import { v4 as uuidv4 } from 'uuid';
import { ManageService } from './manage.service';
import { DbService } from './db.service';
import { liveQuery } from 'dexie';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  cards$ = liveQuery(() => this.dbService.cards.toArray());
  // cards: Card[] = [];

  // private cards$ = new ReplaySubject<Card[]>(1);
  // private syncronize$ = new Subject<void>();

  constructor(private readonly dbService: DbService) {
    // of(true)
    //   .pipe(
    //     switchMap(() => {
    //       if (this.manageService.sync === 'online') {
    //         return this.httpClient.get<Card[]>('/api/cards', {
    //           headers: new HttpHeaders().set(
    //             'Authorization',
    //             this.manageService.token
    //           ),
    //         });
    //       } else {
    //         return throwError(() => new Error('Application is offline'));
    //       }
    //     })
    //   )
    //   .subscribe({
    //     next: (cards) => {
    //       console.info(cards);
    //       this.cards = cards;
    //       this.cards$.next(this.cards);
    //     },
    //     error: (error) => {
    //       console.info(error);
    //       const dataString =
    //         window.localStorage.getItem('Fk.CardStore') ?? '[]';
    //       this.cards = JSON.parse(dataString);
    //       this.cards$.next(this.cards);
    //     },
    //   });
    // this.syncronize$
    //   .pipe(
    //     tap(() => {
    //       const dataString = JSON.stringify(this.cards);
    //       window.localStorage.setItem('Fk.CardStore', dataString);
    //     }),
    //     filter(() => this.manageService.sync === 'online'),
    //     switchMap(() =>
    //       this.httpClient.post<Card[]>('/api/cards', this.cards, {
    //         headers: new HttpHeaders().set(
    //           'Authorization',
    //           this.manageService.token
    //         ),
    //       })
    //     )
    //   )
    //   .subscribe((cards) => {
    //     console.info('cards remote after sync: ', cards);
    //     this.cards = cards;
    //     this.cards$.next(this.cards);
    //     const dataString = JSON.stringify(this.cards);
    //     window.localStorage.setItem('Fk.CardStore', dataString);
    //   });
  }

  getAll(deck_id: string): Observable<Card[]> {
    // return this.cards$.pipe(
    //   map((cards) => {
    //     return cards
    //       .filter((card) => card.deck_id === deck_id)
    //       .filter((card) => card.sync !== 'Delete');
    //   })
    // );
    return of();
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

  get(card_id: string): Observable<Card> {
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

  delete(card_id: string): Observable<Card> {
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
