import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
 
@Component({
  selector: 'app-admin-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-register.component.html',
  styleUrl: './admin-register.component.css'
})
export class AdminRegisterComponent {
  adminData = {
    name: '',
    mobileNo: '',
    username: '',
    password: '',
    email: '',
     area: '',
    city: '',
    // uniqueCode: '',
    role: { id: 1 } // ✅ Hidden Role ID (Admin)
  };
  profilePicture!: File;
 
  constructor(private authService: AuthService, private router: Router) {}
 
  // ✅ Handle File Selection
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.profilePicture = event.target.files[0];
    }
  }
 
  // ✅ Register Admin Function
  registerAdmin() {
    if (!this.profilePicture) {
      alert('Please select a profile picture!');
      return;
    }
 
    this.authService.registerAdmin(this.adminData, this.profilePicture).subscribe(
      (response) => {
        console.log('Registration Response:', response);
        alert('Registration successful! Redirecting to login...');
        this.router.navigate(['/admin-login']); // ✅ Redirect after success
      },
      (error) => {
        alert('Registration failed! Please try again.');
        console.error('Registration error:', error);
      }
    );
  }
}
 
 