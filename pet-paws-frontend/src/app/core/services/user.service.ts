import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

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

Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  getUser(userId: string) {}
}
