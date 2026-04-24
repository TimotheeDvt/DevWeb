import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Message {
  private http = inject(HttpClient);

  sendMessage(url: string, data: any): Observable<any> {
    const completeUrl = environment.backendPrefix + `${url}`;

    return this.http.post<any>(
      completeUrl,
      data,
      { withCredentials: true }
    );
  }
}