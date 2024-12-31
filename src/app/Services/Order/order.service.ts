import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  private baseUrl = 'http://localhost:5220/api/Order';

  constructor(private http: HttpClient) {}

  getUserOrders(pageNumber: number = 1, pageSize: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
      
    return this.http.get<any>(this.baseUrl, { params });
  }
}
