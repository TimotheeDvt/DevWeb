import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import {HttpClient} from "@angular/common/http";

export interface MyInfo {
  nom: string;
  nb: number;
}

@Injectable({
  providedIn: 'root'
})
export class MonServiceService {

  constructor(private http: HttpClient) { }

  getInfos(): Observable<MyInfo> {
    return this.http.get<MyInfo>('http://127.0.0.1/xmobile_cours/info.php');

  }
}