import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  sendMessage(message: string) {
    return this.http.post(`${this.baseUrl}/query`, { query: message });
  }
}
