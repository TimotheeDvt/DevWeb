import { Injectable, inject } from '@angular/core';
import { Message } from './message';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private message = inject(Message);
  public is_authenticated = false;

  constructor() {
    console.log("Une instance de AuthService vient d'être construite.");
  }

  sendAuthentication(login: string, password: string): Observable<any> {
    return new Observable((subscriber: Subscriber<any>) => {
      this.message.sendMessage('checkLogin', { login, password }).subscribe(res => {
        // Mise à jour de l'état interne
        this.is_authenticated = (res.status === 'ok');

        // On transmet la réponse au LoginComponent
        subscriber.next(res);
        subscriber.complete();
      });
    });
  }
}