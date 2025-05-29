import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from '../profile/profile.component';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';
import { CustomerSupportComponent } from "../customer-support/customer-support.component"; // Import CartService

@Component({
  selector: 'app-profile-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ProfileComponent, CustomerSupportComponent],
  templateUrl: './profile-dashboard.component.html',
  styleUrl: './profile-dashboard.component.css'
})
export class ProfileDashboardComponent implements OnInit {
  activeTab: string = 'profile';
  wishlistItems: any[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private wishlistService: WishlistService,
    private cartService: CartService // Inject CartService
  ) {}

  ngOnInit() {
    // Subscribe to wishlist updates
    this.wishlistService.getWishlist().subscribe(items => {
      this.wishlistItems = items;
    });
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  // Move item from wishlist to cart
  moveToCart(item: any) {
    this.cartService.addToCart(item); // Add item to cart
    this.removeFromWishlist(item.id); // Remove item from wishlist
  }

  // Remove item from wishlist
  removeFromWishlist(itemId: number) {
    this.wishlistService.removeFromWishlist(itemId);
    this.wishlistItems = this.wishlistItems.filter(item => item.id !== itemId);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
