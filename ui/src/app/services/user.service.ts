import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../_dto/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly httpClient: HttpClient) {}

  update(user: User): Observable<User> {
    return this.httpClient.post<User>('/api/user', user);
  }

  get(user: User): Observable<User> {
    return of({
      id: '116645703342781609823',
      deck_ids: ['f2cc5da4-36fb-4a4c-a6e9-5df9e66e708c'],
    } as User);
    // return this.httpClient.get<User>('/api/user/' + user.id);
  }
}
