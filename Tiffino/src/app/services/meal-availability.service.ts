import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MealAvailabilityService {
  private apiUrl = 'http://localhost:8080/api/meal-availability';

  constructor(private http: HttpClient) {}

  // Method to send POST request
  addMealAvailability(mealAvailability: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, mealAvailability);
  }
}
