import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment.dev';
 
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  forgotPasswordForm: FormGroup;
  resetPasswordForm: FormGroup;
 
  isForgotPassword = false;
  otpSent = false;
  showResetForm = false;
 
  private baseUrl = environment.apiUrl;
  private forgotPasswordUrl = `${this.baseUrl}/forgot-password`;
  private resetPasswordUrl = `${this.baseUrl}/reset-password`;
 
  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
 
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
 
    this.resetPasswordForm = this.fb.group({
      otp: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }
 
  // ✅ Login Form Submission
  onSubmit(): void {
    if (this.loginForm.valid) {
      alert('Logged in successfully!');
      localStorage.setItem('userEmail', this.loginForm.value.email);
      this.router.navigate(['/profile']);
    }
  }
 
  // ✅ Show Forgot Password Section
  showForgotPassword() {
    this.isForgotPassword = true;
  }
 
  // ✅ Send OTP
  sendOtp() {
    const email = this.forgotPasswordForm.value.email;
    if (!email) {
      alert('Please enter your email.');
      return;
    }
 
    this.http.post(`${this.forgotPasswordUrl}`, {}, {
      params: { email },
      responseType: 'text'
    }).subscribe(
      (response: string) => {
        alert(response);
        this.otpSent = true;
        this.showResetForm = true;
      },
      (error) => {
        console.error('Error:', error);
        alert('Failed to send OTP. Please check your email and try again.');
      }
    );
  }
 
  // ✅ Reset Password with OTP
  resetPassword() {
    const otp = this.resetPasswordForm.value.otp;
    const newPassword = this.resetPasswordForm.value.newPassword;
    const confirmPassword = this.resetPasswordForm.value.confirmPassword;
 
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
 
    this.http.post<{ success: boolean }>(`${this.resetPasswordUrl}`, {}, {
      params: { otp, newPassword, confirmPassword },
      responseType: 'text' as 'json'
    }).subscribe(
      (response: any) => {
        alert(response);
        this.isForgotPassword = false;
        this.otpSent = false;
        this.showResetForm = false;
      },
      (error) => {
        console.error('Error:', error);
        alert('Failed to reset password. Please try again.');
      }
    );
  }
}
 
 