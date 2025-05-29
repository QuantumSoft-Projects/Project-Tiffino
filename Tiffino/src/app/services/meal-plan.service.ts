import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MealPlanService {
  private apiUrl = 'http://localhost:8080/api/mealplans';

  constructor(private http: HttpClient) {}

  addMealPlan(mealPlan: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, mealPlan);
  }
}
