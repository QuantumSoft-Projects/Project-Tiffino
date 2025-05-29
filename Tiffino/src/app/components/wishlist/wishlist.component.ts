import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlist: any[] = []; // Stores wishlist items

  constructor(public wishlistService: WishlistService) {}

  ngOnInit() {
    // ✅ Subscribe to wishlist observable
    this.wishlistService.getWishlist().subscribe((items) => {
      this.wishlist = items;
    });
  }

  removeFromWishlist(itemId: number) {
    this.wishlistService.removeFromWishlist(itemId);
  }
}
