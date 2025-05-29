import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlist: any[] = [];
  private wishlistSubject = new BehaviorSubject<any[]>([]); // Stores wishlist items
  private wishlistCount = new BehaviorSubject<number>(0); // Stores wishlist count
 
  constructor() {}
 
  // ✅ Method to return the wishlist as an observable
  getWishlist(): Observable<any[]> {
    return this.wishlistSubject.asObservable();
  }
 
  // ✅ Method to return the wishlist count
  getWishlistCount(): number {
    return this.wishlist.length;
  }
 
  // ✅ Method to return the wishlist count as an observable
  getWishlistCountObservable(): Observable<number> {
    return this.wishlistCount.asObservable();
  }
 
  addToWishlist(item: any) {
    this.wishlist.push(item);
    this.updateWishlist();
  }
 
  removeFromWishlist(itemId: number) {
    this.wishlist = this.wishlist.filter(item => item.id !== itemId);
    this.updateWishlist();
  }
 
  private updateWishlist() {
    this.wishlistSubject.next(this.wishlist); // Update wishlist observable
    this.wishlistCount.next(this.wishlist.length); // Update wishlist count
  }
}
 
 