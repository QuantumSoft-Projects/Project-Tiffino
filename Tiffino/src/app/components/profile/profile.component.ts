
import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubscriptionComponent } from "../subscription/subscription.component";
import { RegionalCuisinesComponent } from "../regional-cuisines/regional-cuisines.component";
import { CityListComponent } from "../city-list/city-list.component";
import { FooterComponent } from "../footer/footer.component";
import { RestaurantsComponent } from '../restaurants/restaurants.component';
import { HeroComponent } from "../hero/hero.component";
import { MembershipComponent } from "../membership/membership.component";
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, SubscriptionComponent, RegionalCuisinesComponent, CityListComponent, FooterComponent, RestaurantsComponent, HeroComponent, MembershipComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  cartItemCount: number = 0; // Initialize cart count
  wishlistItemCount: number = 0;
  isScrolled = false;
  isLoggedIn = false;
  userEmail: string | null = null;
  ngOnInit() {
    // Simulate fetching user email after login
    this.userEmail = localStorage.getItem('userEmail');
    
    this.wishlistService.getWishlistCountObservable().subscribe((count: number) => {
      this.wishlistItemCount = count;
    });
  }

 

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50; // Change background after scrolling 50px
  }
 
  constructor(  private router: Router,  public wishlistService: WishlistService,public cartService: CartService) {}
 

  logout() {
    localStorage.removeItem('userEmail');
    this.userEmail = null;
    this.navigateTo('/');
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
  // Function to update cart count (you can modify this based on actual cart logic)
  updateCartCount(count: number) {
    this.cartItemCount = count;
  }
 



}
