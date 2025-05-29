import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
 
@Component({
  selector: 'app-super-adminlogin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './super-adminlogin.component.html',
  styleUrl: './super-adminlogin.component.css'
})
export class SuperAdminloginComponent {
  username: string = '';
  password: string = '';
 
  constructor(private authService: AuthService, private router: Router) {}
 
  loginSuperAdmin() {
    this.authService.superAdminLogin(this.username, this.password).subscribe(
      (response) => {
        localStorage.setItem('superAdminToken', response.token);
        localStorage.setItem('userRole', 'superAdmin'); // Store role
        this.router.navigate(['/superdashboard']);
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }
 
  goBack() {
    window.history.back(); //
  }
 
 
}
 