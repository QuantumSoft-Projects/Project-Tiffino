import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private apiUrl = 'http://localhost:8080/api/subscriptions/create'; // Replace with actual API URL
 
  constructor(private http: HttpClient) {}
 
  // ✅ Get existing subscription details
  getSubscriptionDetails(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
 
  // ✅ Subscribe to a plan
  subscribeToPlan(subscriptionData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, subscriptionData);
  }
}
 
 
 