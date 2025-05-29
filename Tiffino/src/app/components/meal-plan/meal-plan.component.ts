import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MealPlanService } from '../../services/meal-plan.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-meal-plan',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './meal-plan.component.html',
  styleUrls: ['./meal-plan.component.css']  // Fix typo from "styleUrl" to "styleUrls"
})
export class MealPlanComponent implements OnInit {
  mealPlanForm!: FormGroup;
  restaurants = [
    { id: 1, name: 'Restaurant A' },
    { id: 2, name: 'Restaurant B' },
    { id: 3, name: 'Restaurant C' }
  ];
  regions = [
    { id: 1, name: 'North' },
    { id: 2, name: 'South' },
    { id: 3, name: 'East' }
  ];

  constructor(private fb: FormBuilder, private mealPlanService: MealPlanService) {}

  ngOnInit(): void {
    this.mealPlanForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      restaurantId: ['', Validators.required],
      regionId: ['', Validators.required]
    });
  }

  submitMealPlan(): void {
    if (this.mealPlanForm.valid) {
      const formData = {
        name: this.mealPlanForm.value.name,
        description: this.mealPlanForm.value.description,
        price: this.mealPlanForm.value.price,
        menu: {
          restaurant: { id: this.mealPlanForm.value.restaurantId },
          region: { id: this.mealPlanForm.value.regionId }
        }
      };

      this.mealPlanService.addMealPlan(formData).subscribe({
        next: () => {
          alert('Meal Plan Added Successfully');
          this.mealPlanForm.reset();
        },
        error: (err) => {
          alert('Error adding meal plan');
          console.error(err);
        }
      });
    }
  }
}
