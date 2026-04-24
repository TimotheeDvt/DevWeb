import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Message {
  private http = inject(HttpClient);

  sendMessage(url: string, data: any): Observable<any> {
    const completeUrl = "http://127.0.0.1:3000/" + `${url}`;

    return this.http.post<any>(
      completeUrl,
      data,
      { withCredentials: true }
    );
  }
}