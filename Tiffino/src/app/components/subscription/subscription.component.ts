import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { HttpClient } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
 
@Component({

  selector: 'app-subscription',

  standalone: true,

  imports: [CommonModule, ReactiveFormsModule],

  templateUrl: './subscription.component.html',

  styleUrl: './subscription.component.css'

})

export class SubscriptionComponent {

  isFormVisible: boolean = false;

  subscriptionForm: FormGroup;

  selectedPlan: string = '';
 
  // Subscription Plan Prices (Updated keys to match UI)

  planPrices: { [key: string]: number } = {

    'ONE_MEAL_PER_DAY': 2999,   // ₹2999 per month

    'TWO_MEALS_PER_DAY': 5499,  // ₹5499 per month

    'THREE_MEALS_PER_DAY': 7999 // ₹7999 per month

  };
 
  constructor(private fb: FormBuilder, private http: HttpClient) {

    this.subscriptionForm = this.fb.group({

      fullName: ['', Validators.required],

      email: ['', [Validators.required, Validators.email]],

      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],

      startDate: [{ value: '', disabled: true }, Validators.required],

      endDate: [{ value: '', disabled: true }, Validators.required],

      totalAmount: [{ value: '', disabled: true }, Validators.required],

      paymentPlan: ['MONTHLY', Validators.required]

    });
 
    // Auto-update price when payment plan changes

    this.subscriptionForm.get('paymentPlan')?.valueChanges.subscribe(() => {

      if (this.selectedPlan) {

        this.calculateTotalAmount();

      }

    });

  }
 
  openForm(planName: string) {

    this.selectedPlan = planName;

    const monthlyPrice = this.planPrices[planName] || 0;
 
    const today = new Date();

    let endDate = new Date(today);

    let totalAmount = monthlyPrice; // Default for monthly
 
    switch (this.subscriptionForm.get('paymentPlan')?.value) {

      case 'WEEKLY':

        totalAmount = monthlyPrice / 4; // 1/4th of monthly price

        endDate.setDate(today.getDate() + 7);

        break;

      case 'BI_WEEKLY':

        totalAmount = monthlyPrice / 2; // 1/2 of monthly price

        endDate.setDate(today.getDate() + 14);

        break;

      case 'MONTHLY':

        endDate.setMonth(today.getMonth() + 1);

        break;

    }
 
    this.subscriptionForm.patchValue({

      startDate: today.toISOString().split('T')[0],

      endDate: endDate.toISOString().split('T')[0],

      totalAmount: totalAmount

    });
 
    this.isFormVisible = true;

  }
 
  calculateTotalAmount() {

    const paymentPlan = this.subscriptionForm.get('paymentPlan')?.value;

    const monthlyPrice = this.planPrices[this.selectedPlan] || 0;

    let totalAmount = monthlyPrice; // Default for monthly
 
    switch (paymentPlan) {

      case 'WEEKLY':

        totalAmount = monthlyPrice / 4;

        break;

      case 'BI_WEEKLY':

        totalAmount = monthlyPrice / 2;

        break;

      case 'MONTHLY':

        totalAmount = monthlyPrice;

        break;

    }
 
    this.subscriptionForm.patchValue({ totalAmount });

  }
 
  closeForm(): void {

    this.isFormVisible = false;

    this.selectedPlan = '';

    this.subscriptionForm.reset();

  }
 
  onSubmit(): void {

    if (this.subscriptionForm.valid) {

      const formData = this.subscriptionForm.getRawValue();
 
      const payload = {

        subscriptionType: this.selectedPlan,

        subscriptionStatus: "ACTIVE",

        startDate: formData.startDate,

        endDate: formData.endDate,

        totalAmount: formData.totalAmount,

        isZeroCostDelivery: true,

        fullName: formData.fullName,

        phoneNumber: formData.phoneNumber,

        email: formData.email,

        paymentPlan: formData.paymentPlan

      };
 
      this.http.post('http://localhost:8080/api/subscriptions/create', payload).subscribe({

        next: (response) => {

          console.log('Subscription successful:', response);

          alert('Subscription successful!');

          this.closeForm();

        },

        error: (error) => {

          console.error('Error:', error);

          alert('Subscription failed. Please try again.');

        }

      });
 
    } else {

      alert('Please fill in all required fields correctly.');

    }

  }

}

 