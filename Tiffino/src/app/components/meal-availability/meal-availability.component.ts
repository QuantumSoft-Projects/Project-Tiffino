import { Component } from '@angular/core';
import { MealAvailabilityService } from '../../services/meal-availability.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-meal-availability',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './meal-availability.component.html',
  styleUrl: './meal-availability.component.css'
})
export class MealAvailabilityComponent {
  mealAvailabilityData = {
    availabilityDate: '',
    isAvailable: false, // ✅ Keep this as a boolean
    mealPlan: { id: null },
    region: { id: null }
  };

  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private http: HttpClient) {}

  submitMealAvailability() {
    const requestData = {
      ...this.mealAvailabilityData,
      isAvailable: this.mealAvailabilityData.isAvailable // ✅ Keep it boolean; backend will convert to 1 or 0
    };

    this.http.post<any>('http://localhost:8080/api/meal-availability', requestData)
      .subscribe(
        response => {
          this.successMessage = 'Meal availability updated successfully!';
          this.errorMessage = null;
          this.resetForm();

          // Hide success message after 3 seconds
          setTimeout(() => {
            this.successMessage = null;
          }, 3000);
        },
        error => {
          this.errorMessage = 'Failed to update meal availability. Please try again.';
          this.successMessage = null;
        }
      );
  }

  resetForm() {
    this.mealAvailabilityData = {
      availabilityDate: '',
      isAvailable: false, // ✅ Reset properly as a boolean
      mealPlan: { id: null },
      region: { id: null }
    };
  }
}