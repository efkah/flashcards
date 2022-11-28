import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ManageService {
  constructor(private readonly httpClient: HttpClient) {}

  get sync(): string {
    const value =
      window.localStorage.getItem('Fk.Flashcards.Sync') ?? 'offline';
    return value;
  }

  set sync(value: string) {
    window.localStorage.setItem('Fk.Flashcards.Sync', value);
  }

  get token(): string {
    const value = window.localStorage.getItem('Fk.Flashcards.Token') ?? '';
    return value;
  }

  set token(value: string) {
    window.localStorage.setItem('Fk.Flashcards.Token', value);
  }

  getBackendHealth(): Observable<string> {
    return this.httpClient.get<string>('/api/backendhealth');
  }

  getDatabaseHealth(): Observable<string> {
    return this.httpClient.get<string>('/api/databasehealth');
  }
}
