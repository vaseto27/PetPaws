import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000/api/auth';
  private accessTokenKey = 'accessToken';
  private refreshTokenKey = 'refreshToken';
  constructor(private http: HttpClient){}


  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, {name, email, password})
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, {email, password}).pipe(
      tap((response: any) => {
        localStorage.setItem(this.accessTokenKey, response.accessToken);
        localStorage.setItem(this.refreshTokenKey, response.refreshToken);
      })
    )
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem(this.refreshTokenKey);
    if(!refreshToken) return throwError('No refresh token available');

    return this.http.post(`${this.baseUrl}/refresh-token`, {refreshToken}).pipe(
      tap((response: any) => {
        localStorage.setItem(this.accessTokenKey, response.accessToken)
      })
    )
  }

  logout(): void {
   const refreshToken = localStorage.getItem(this.refreshTokenKey);
   if(refreshToken) {
    this.http.post(`${this.baseUrl}/logout`, {refreshToken}).subscribe();
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey)
   }
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey)
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.accessTokenKey)
  }
}
// db key vvvaleksandrovvv 7I9OUD6YBY9DxLVZ

//
