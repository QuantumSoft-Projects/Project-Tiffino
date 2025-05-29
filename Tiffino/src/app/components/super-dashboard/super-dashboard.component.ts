import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-super-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './super-dashboard.component.html',
  styleUrls: ['./super-dashboard.component.css']
})
export class SuperDashboardComponent {
  currentPage: string = 'dashboard'; // Default page
  step: number = 1; // 1 = Registration, 2 = Change Password

  // Admin Registration Data
  adminData = {
    name: '',
    mobileNo: '',
    username: '',
    password: '',
    email: '',
    area: '',
    city: '',
    postalCode: '',
    role: { id: 1 },
    superAdmin: { id: 1 }
  };
  profilePicture!: File;
  errorMessage: string = '';
  successMessage: string = '';
  isLoading = false;

  // Change Password Data
  email: string = '';
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  // Orders Data (Dummy Data)
  orders = [
    { id: 101, customer: 'John Doe', amount: 250, status: 'Delivered', date: new Date('2024-02-20T10:30:00') },
    { id: 102, customer: 'Jane Smith', amount: 180, status: 'Pending', date: new Date('2024-02-22T14:15:00') },
    { id: 103, customer: 'Michael Brown', amount: 320, status: 'Delivered', date: new Date('2024-02-23T18:45:00') },
    { id: 104, customer: 'Emily Wilson', amount: 150, status: 'Pending', date: new Date('2024-02-24T09:00:00') }
  ];

  constructor(private authService: AuthService, private router: Router) {}

  // Sidebar Navigation
  navigateTo(page: string) {
    this.currentPage = page;
  }

  // Handle File Selection
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.profilePicture = event.target.files[0];
    }
  }

  // Register Admin
  registerAdmin() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.profilePicture) {
      this.errorMessage = 'Please select a profile picture!';
      return;
    }

    this.authService.registerAdmin(this.adminData, this.profilePicture).subscribe(
      (response) => {
        console.log('Registration Response:', response);
        this.successMessage = 'Registration successful! Sending credentials to email...';

        // Send credentials via email
        this.authService.sendCredentialsToEmail(this.adminData.email).subscribe(
          () => {
            console.log('Credentials sent successfully.');
            this.successMessage += ' Credentials sent successfully! Redirecting to login...';
            setTimeout(() => {
              this.router.navigate(['/admin-login']);
            }, 3000);
          },
          (error) => {
            console.error('Failed to send credentials:', error);
            this.errorMessage = `Registration successful, but failed to send credentials. Error: ${error.error?.message || error.message}`;
          }
        );
      },
      (error: any) => {
        this.errorMessage = `Registration failed! Please try again. Error: ${error.error?.message || error.message}`;
        console.error('Registration error:', error);
      }
    );
  }

  // Change Password
  changePassword() {
    if (this.newPassword !== this.confirmPassword) {
      alert('New Password and Confirm Password must match!');
      return;
    }

    this.authService.changePassword(this.email, this.oldPassword, this.newPassword).subscribe(
      () => {
        alert('Password changed successfully!');
        this.router.navigate(['/dashboard']);
      },
      (error: HttpErrorResponse) => {
        alert(error.error?.message || 'Failed to change password. Try again.');
        console.error('Error:', error);
      }
    );
  }

  // Dashboard Statistics Methods
  totalOrders() {
    return this.orders.length;
  }

  totalCustomers() {
    return new Set(this.orders.map(order => order.customer)).size;
  }

  totalAmount() {
    return this.orders.reduce((sum, order) => sum + order.amount, 0);
  }

  pendingOrders() {
    return this.orders.filter(order => order.status === 'Pending').length;
  }

  deliveredOrders() {
    return this.orders.filter(order => order.status === 'Delivered').length;
  }
}
