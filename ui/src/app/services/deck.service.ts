import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  filter,
  from,
  map,
  Observable,
  of,
  ReplaySubject,
  Subject,
  switchMap,
  switchMapTo,
  tap,
  throwError,
} from 'rxjs';
import { CreateDeck, Deck } from '../_dto/Deck';
import { v4 as uuidv4 } from 'uuid';
import { ManageService } from './manage.service';
import { SocialAuthService } from 'angularx-social-login';
import { DbService } from './db.service';
import { liveQuery } from 'dexie';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  decks$ = liveQuery(() => this.dbService.decks.toArray());
  // decks: Deck[] = [];

  // private decks$ = new ReplaySubject<Deck[]>(1);
  // private syncronize$ = new Subject<void>();

  constructor(private readonly dbService: DbService) {
    // of(true)
    //   .pipe(
    //     switchMap(() => {
    //       if (this.manageService.sync === 'online') {
    //         return this.httpClient.get<Deck[]>('/api/decks', {
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
    //     next: (decks) => {
    //       this.decks = decks;
    //       this.decks$.next(this.decks);
    //     },
    //     error: (error) => {
    //       const dataString =
    //         window.localStorage.getItem('Fk.DeckStore') ?? '[]';
    //       this.decks = JSON.parse(dataString);
    //       this.decks$.next(this.decks);
    //     },
    //   });
    // this.syncronize$
    //   .pipe(
    //     tap(() => {
    //       const dataString = JSON.stringify(this.decks);
    //       window.localStorage.setItem('Fk.DeckStore', dataString);
    //     }),
    //     filter(() => this.manageService.sync === 'online'),
    //     switchMap(() =>
    //       this.httpClient.post<Deck[]>('/api/decks', this.decks, {
    //         headers: new HttpHeaders().set(
    //           'Authorization',
    //           this.manageService.token
    //         ),
    //       })
    //     )
    //   )
    //   .subscribe((decks) => {
    //     console.info('decks remote after sync: ', decks);
    //     this.decks = decks;
    //     const dataString = JSON.stringify(this.decks);
    //     window.localStorage.setItem('Fk.DeckStore', dataString);
    //   });
  }

  getAll(): Observable<Deck[]> {
    // return of(this.decks.filter((deck) => deck.sync !== 'Delete'));
    // return this.decks$.pipe(
    //   map((decks) => {
    //     return decks.filter((deck) => deck.sync !== 'Delete');
    //   })
    // );
    return from(this.decks$);
  }

  add(createDeck: CreateDeck): Observable<Deck> {
    // this.decks.push({
    //   ...createDeck,
    //   id: uuidv4(),
    //   sync: 'Add',
    // });
    // this.syncronize$?.next();
    // return of(this.decks[this.decks.length - 1]);
    return of();
  }

  get(deck_id: string): Observable<Deck> {
    // const selected = this.decks.filter((deck) => deck.id === deck_id);
    // if (selected.length !== 1) {
    //   throw throwError(() => new Error());
    // }
    // return of(selected[0]);
    return of();
  }

  update(updateDeck: Deck): Observable<Deck> {
    // const store_id = this.decks.findIndex((deck) => deck.id === updateDeck.id);
    // updateDeck.sync = this.decks[store_id].sync === 'Add' ? 'Add' : 'Update';
    // this.decks[store_id] = updateDeck;
    // this.syncronize$?.next();
    // return of(this.decks[store_id]);
    return of();
  }

  delete(deck_id: string): Observable<Deck> {
    // const deleting = this.decks.filter((deck) => deck.id === deck_id);
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
    // this.decks.forEach((deck) => {
    //   deck.sync = 'Add';
    // });
    // this.syncronize$.next();
    // this.syncronize$.subscribe();
  }

  removeAll() {
    // this.decks = [];
    // this.syncronize$.next();
  }
}
