import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-regional-cuisines',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './regional-cuisines.component.html',
  styleUrl: './regional-cuisines.component.css'
})
export class RegionalCuisinesComponent implements OnInit {
  isFullMenuVisible: boolean = false;
  wishlist: any[] = [];

  cuisines = [
    { id: 1, name: 'Punjabi Thali', description: ' Parathas, dal makhani, paneer butter etc.', image: 'assets/img/panjabi_cuisine.jpeg', price: 250, isWishlisted: false },
    { id: 2, name: 'South Indian Platter', description: 'Dosa, idli, sambar, coconut chutney, etc.', image: 'assets/img/south-indian-cuisine.jpg', price: 200, isWishlisted: false },
    { id: 3, name: 'Bengali Feast', description: 'Macher jhol, shorshe ilish, mishti doi, etc.', image: 'assets/img/bengali-cuisine.jpg', price: 280, isWishlisted: false },
    { id: 4, name: 'Rajasthani Special', description: 'Dal baati churma, gatte ki sabzi, and etc.', image: 'assets/img/rajasthani.jpg', price: 260, isWishlisted: false }
  ];

  constructor(private router: Router, public wishlistService: WishlistService, private cartService: CartService) {}

  ngOnInit() {
    this.loadWishlist();
  }

  // ✅ Splits cuisines into chunks for carousel
  getCuisineChunks(): any[][] {
    const chunkSize = 3;
    const chunks: any[][] = [];
    for (let i = 0; i < this.cuisines.length; i += chunkSize) {
      chunks.push(this.cuisines.slice(i, i + chunkSize));
    }
    return chunks;
  }

  toggleMenuView() {
    this.isFullMenuVisible = !this.isFullMenuVisible;
  }

  navigateToFullMenu() {
    this.router.navigate(['/regional-cuisines']);
  }

  // ✅ Add item to cart & navigate to cart page
  placeOrder(cuisine: any) {
    this.cartService.addToCart(cuisine);
    this.router.navigate(['/cart']); // Redirects to cart page
  }

  toggleWishlist(item: any) {
    if (this.isWishlisted(item.id)) {
      this.wishlistService.removeFromWishlist(item.id);
    } else {
      this.wishlistService.addToWishlist(item);
    }
    this.loadWishlist();
  }

  // ✅ Load wishlist items from wishlist service
  loadWishlist() {
    this.wishlistService.getWishlist().subscribe((wishlist) => {
      this.wishlist = wishlist;
    });
  }

  // ✅ Check if an item is in the wishlist
  isWishlisted(itemId: number): boolean {
    return this.wishlist.some(wishItem => wishItem.id === itemId);
  }
}
