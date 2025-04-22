import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 

  private baseUrl = 'http://localhost:8080/api/auth/login';

  constructor(private http: HttpClient) {}

  // login(username: string, password: string): Observable<string> {
  //   return this.http.post(`${this.baseUrl}/login`, { username, password }, { responseType: 'text' });
  // }
  login(payload: { username: string; password: string; role: string }): Observable<any> {
    return this.http.post(this.baseUrl, payload);
  }
  // login(credentials: any): Observable<{ token: string }> {
  //   return this.http.post<{ token: string }>(`${this.baseUrl}/login`, credentials);
  // }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // 🔹 Check token presence
  }

  logout() {
    localStorage.removeItem('token'); // 🔹 Remove token on logout
  }

}
