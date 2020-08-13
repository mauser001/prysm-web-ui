import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API_URL = 'https://jsonplaceholder.typicode.com';

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {

  constructor(
    private http: HttpClient,
  ) { }

  getValidatorBalances() {
    return this.http.get(`${API_URL}/todos/1`);
  }
}
