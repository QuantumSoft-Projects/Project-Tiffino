import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
 
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  cartItemCount: number = 0; 
  wishlistItemCount: number = 0;
  isScrolled = false;
  isLoggedIn = false;
  userProfile: any = null;
  isSuperAdmin: boolean = false;
 
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }
 
  constructor(
    private authService: AuthService, 
    private router: Router,
    public cartService: CartService, 
    public wishlistService: WishlistService
  ) {}

  ngOnInit() {
    // Check authentication and user data
    this.authService.getUser().subscribe((userData) => {
      this.userProfile = userData;
      this.isLoggedIn = !!userData;
    });

    // Subscribe to wishlist count observable
    this.wishlistService.getWishlistCountObservable().subscribe((count: number) => {
      this.wishlistItemCount = count;
    });

    // ✅ Subscribe to cart count observable (same logic as wishlist)
    this.cartService.getCartCountObservable().subscribe((count: number) => {
      this.cartItemCount = count;
    });

    // Check tokens in local storage
    const token = localStorage.getItem('superAdminToken') || localStorage.getItem('adminToken');
    this.isLoggedIn = !!token;

    // Check if logged-in user is a Super Admin
    const role = localStorage.getItem('userRole');
    this.isSuperAdmin = role === 'superAdmin';

    if (!this.userProfile) {
      this.userProfile = {
        name: 'Super Admin',
        profilePicture: 'assets/img/default-user.png'
      };
    }
  }
 
  logout() {
    this.authService.logout();
    localStorage.removeItem('superAdminToken');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('userRole');
    this.isLoggedIn = false;
    this.isSuperAdmin = false;
    this.router.navigate(['/super-admin-login']);
  }
 
  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
