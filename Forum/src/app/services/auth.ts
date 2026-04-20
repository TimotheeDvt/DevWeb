import { Injectable, inject } from '@angular/core';
import { Message, PhpData } from './message';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private messageService = inject(Message);

  // Attribut conservant l'état d'authentification
  public is_authenticated: boolean = false;

  constructor() {
    console.log("Une instance de AuthService vient d'être construite.");
  }

  /**
   * Envoie les identifiants au backend et met à jour l'état interne
   */
  sendAuthentication(login: string, password: string): Observable<PhpData> {
    return new Observable<PhpData>((subscriber) => {
      // On effectue la requête unique au backend
      this.messageService.sendMessage('checkLogin', {
        login: login,
        password: password
      }).subscribe({
        next: (res: PhpData) => {
          // Mise à jour de l'attribut interne
          this.is_authenticated = (res.status === 'done' || res.status === 'ok');

          // Transmission de la réponse au composant (subscriber)
          subscriber.next(res);
          subscriber.complete();
        },
        error: (err) => {
          this.is_authenticated = false;
          subscriber.error(err);
        }
      });
    });
  }
}