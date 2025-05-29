import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  step: number = 1; // 1: Login, 2: OTP Verification, 3: Reset Password
 
  username: string = '';
  password: string = '';
  email: string = '';
  otp: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';
 
  constructor(private authService: AuthService, private router: Router) {}
 
  // ✅ Admin Login
  loginAdmin() {
    this.errorMessage = '';
    this.successMessage = '';
 
    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter your username and password.';
      return;
    }
 
    this.authService.adminLogin(this.username, this.password).subscribe(
      (response) => {
        if (response) {
          localStorage.setItem('admin_token', response);
          this.successMessage = 'Login successful!';
          this.router.navigate(['/admindashboard']);
        } else {
          this.errorMessage = 'Invalid credentials. Please try again.';
        }
      },
      (error) => {
        console.error('Login error:', error);
        this.errorMessage = error?.error || 'Login failed. Please try again.';
      }
    );
  }
 
  // ✅ Forgot Password (Request OTP)
  forgotPassword() {
    this.errorMessage = '';
    this.successMessage = '';
 
    if (!this.email) {
      this.errorMessage = 'Please enter your email.';
      return;
    }
 
    this.authService.adminForgotPassword(this.email).subscribe(
      () => {
        this.successMessage = 'OTP sent to your email.';
        this.step = 3 // Move to OTP step
      },
      (error) => {
        console.error('Failed to send OTP:', error);
        this.errorMessage = error?.error || 'Failed to send OTP. Please try again.';
      }
    );
  }
 
  // ✅ Reset Password with OTP
  resetPassword() {
    this.errorMessage = '';
    this.successMessage = '';
 
    if (!this.otp || !this.newPassword || !this.confirmPassword) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }
 
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }
 
    this.authService.adminResetPassword(this.otp, this.newPassword, this.confirmPassword).subscribe(
      () => {
        this.successMessage = 'Password reset successful! You can now log in.';
        this.step = 1; // Back to login
      },
      (error) => {
        console.error('Password reset error:', error);
        this.errorMessage = error?.error || 'Invalid OTP or error resetting password.';
      }
    );
  }
 
  goBack() {
    window.history.back();
  }
 
 
 
}
 
 
 