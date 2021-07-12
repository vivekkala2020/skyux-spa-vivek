import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  public saveUser(data: User): Observable<User> {
    return this.http.post<any>('http://localhost:3000/users', data);
  }

  public getUser(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/users');
  }
}
