import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface PhpData {
  status: string;
  data: any;
}

@Injectable({
  providedIn: 'root',
})
export class Message {
  private http = inject(HttpClient);

  sendMessage(url: string, data: any): Observable<PhpData> {
    const completeUrl = `http://127.0.0.1:80/forum-angular-php/backend/${url}.php`;

    const formData = new FormData();

    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });

    return this.http.post<PhpData>(
      completeUrl,
      formData,
      { withCredentials: true }
    );
  }
}