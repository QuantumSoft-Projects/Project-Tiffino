import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  signupForm: FormGroup;
  submitted = false;
  private apiUrl = 'http://localhost:8080/api/register'; // Replace with your backend API

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.signupForm = this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  get f() {
    return this.signupForm.controls;
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    }

    const userData = {
      phoneNumber: this.signupForm.value.phoneNumber,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password
    };

    this.http.post<any>(this.apiUrl, userData, { responseType: 'text' as 'json' }).subscribe({
      next: response => {
        console.log('Signup successful', response);
        alert('Signup Successful!');
        this.router.navigate(['/login']);  // ✅ Redirect to login page after success
      },
      error: error => {
        console.error('Signup failed:', error);
        alert(`Signup Failed: ${error.message}`);
      }
    });
  }
}
