import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8081/api/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]>
  {

    return this.http.get<User[]>(`${this.apiUrl}/getAllUsers`);
  }

  getUser(id: string): Observable<User>
  {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  addUser(user: User): Observable<User>
  {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(user: User): Observable<User>
  {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user);
  }

  deleteUser(id: string): Observable<void>
  {
    return this.http.delete<void>(`${this.apiUrl}/${id}`); }
  }
