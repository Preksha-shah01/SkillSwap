import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Change this if your Node server runs on a different URL/port
const API_URL = 'http://localhost:5000/api';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(payload: { email: string; password: string }): Observable<{ token: string; user: unknown }> {
    return this.http.post<{ token: string; user: unknown }>(API_URL + '/auth/login', payload);
  }
}
