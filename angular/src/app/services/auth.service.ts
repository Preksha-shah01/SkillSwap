import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Change this if your Node server runs on a different URL/port
const API_URL = 'http://localhost:5000/api';

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  university: string;
  department: string;
  semester: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  register(payload: RegisterPayload): Observable<{ token: string; user: unknown }> {
    return this.http.post<{ token: string; user: unknown }>(API_URL + '/auth/register', payload);
  }
}
