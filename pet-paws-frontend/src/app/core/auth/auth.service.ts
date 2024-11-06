import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public baseUrl = 'http://localhost:3000/api/auth'
  constructor(private http: HttpClient){}


  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, {name, email, password})
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, {email, password}).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token)
      })
    )
  }

  logout(): void {
    localStorage.removeItem('token');
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token')
  }
}
// db key vvvaleksandrovvv 7I9OUD6YBY9DxLVZ

//
