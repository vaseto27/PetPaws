import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

interface Pet {
  _id: string;
  name: string;
  species: string;
  age: number
}

interface User {
  _id: string;
  name: string;
  email: string;
  pets: Pet[];
}

@Injectable({
  providedIn: 'root',  // This makes UserService available globally
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<any> {
    return this.http.get(this.apiUrl)
  }
}
