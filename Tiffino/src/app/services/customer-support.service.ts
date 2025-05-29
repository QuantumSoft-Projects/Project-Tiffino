import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerSupportService {
  private baseUrl = 'http://localhost:8080/api/tickets';

  constructor(private http: HttpClient) {}

  createTicket(ticket: any): Observable<any> {
    return this.http.post(this.baseUrl, ticket);
  }

  getTicketById(ticketId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${ticketId}`);
  }

  getAllTickets(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  

  updateTicketStatus(ticketId: number, status: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/${ticketId}/status`, null, {
      params: { status }
    });
  }
  deleteTicket(ticketId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${ticketId}`);
  }
  
}
