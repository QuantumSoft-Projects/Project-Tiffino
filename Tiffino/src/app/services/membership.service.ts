import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {
  private baseUrl = 'http://localhost:8080/api/memberships';

  constructor(private http: HttpClient) {}

  assignMembership(userId: number, membershipType: string): Observable<any> {
    const url = `${this.baseUrl}/assign/${userId}`;
    return this.http.post(url, { membershipType });
  }
}
