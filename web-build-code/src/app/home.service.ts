import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  apiUrl = 'http://localhost:3200/ j j do, backend no lam s thi sua nay cho dung'

  constructor(private http: HttpClient) { }

  // cai post nay la method, phai khop voi ben backend
  public submitCode(code: string, agrs: string): Observable<string> {
    return this.http.post(this.apiUrl + 'ten api submit code', {
      code, agrs
    }).pipe(map((res: string) => res))
  }
}
