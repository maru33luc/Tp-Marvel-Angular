import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  http = inject(HttpClient);
  url:string = 'http://localhost:3000/users';

  constructor() { }

  getUserByEmail(email: string): Observable<User[]>{
    let params = new HttpParams()
    params = params.set('email', email);
    const res = this.http.get<User[]>(this.url, {params});
    console.log(res);
    return res;
  }

}
