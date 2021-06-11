import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  apiUrl = 'http://localhost:8080/Froject/API/';

  constructor(private http: HttpClient) {}

  public submitCode(program: string, language: number): Observable<string> {
    return this.http
      .post(
        this.apiUrl + 'Home/compileCode',
        {
          program,
          language,
        },
        {
          responseType: 'text',
          headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;charset:utf-8')
        }
      )
      .pipe(map((res: string) => res));
  }
}
