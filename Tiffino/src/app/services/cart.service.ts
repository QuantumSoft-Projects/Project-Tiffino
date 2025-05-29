//cart service.ts 
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { WishlistService } from './wishlist.service';
 
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: any[] = [];
  private cartItemCount = new BehaviorSubject<number>(0);
  private discountAmount = new BehaviorSubject<number>(0);
  private couponUrl = 'http://localhost:8080/api/coupons/apply';
 
  cartItemCount$ = this.cartItemCount.asObservable();
  discountAmount$ = this.discountAmount.asObservable();
 
  constructor(private http: HttpClient, private wishlistService: WishlistService) {
    this.loadCartFromStorage();
  }
 
  // ✅ Load Cart & Discount from Storage on Initialization
  private loadCartFromStorage() {
    const storedCart = localStorage.getItem('cart');
    const storedDiscount = localStorage.getItem('discountAmount');
 
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
      this.updateCartCount();
    }
 
    if (storedDiscount) {
      this.discountAmount.next(parseFloat(storedDiscount));
    }
  }
 
  // ✅ Return cart count as observable
  getCartCountObservable(): Observable<number> {
    return this.cartItemCount.asObservable();
  }
 
  addToCart(item: any) {
    const existingItem = this.cart.find(i => i.id === item.id && i.name === item.name);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({ ...item, quantity: 1 });
    }
    this.saveCart();
  }
 
  removeFromCart(itemId: number) {
    this.cart = this.cart.filter(i => i.id !== itemId);
    this.saveCart();
  }
 
  decreaseFromCart(itemId: number) {
    const item = this.cart.find(i => i.id === itemId);
    if (item) {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        this.cart = this.cart.filter(i => i.id !== itemId);
      }
      this.saveCart();
    }
  }
 
  clearCart() {
    this.cart = [];
    localStorage.removeItem('cart');
    localStorage.removeItem('discountAmount');
    this.cartItemCount.next(0);
    this.discountAmount.next(0);
  }
 
  getCartItems() {
    return [...this.cart];
  }
 
  getCart(): any[] {
    return [...this.cart];
  }
 
  getTotalItemCount(): number {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }
 
  getTotalAmount(): number {
    let total = this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return total - this.discountAmount.value;
  }
 
  // ✅ Save Cart & Discount to LocalStorage
  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
    localStorage.setItem('discountAmount', this.discountAmount.value.toString());
    this.updateCartCount();
  }
 
  // ✅ Update cart counter dynamically
  private updateCartCount() {
    this.cartItemCount.next(this.getTotalItemCount());
  }
 
  // ✅ Apply Coupon API & Update Discount
  applyCoupon(code: string): Observable<{ discount: number }> {
    return this.http.post<{ discount: number }>(this.couponUrl, { code });  // ✅ Ensure returning an Observable
  }
 
  getDiscountAmount(): number {
    return this.discountAmount.value; // ✅ Returns the current discount amount
  }
 
 
  // ✅ Set Discount Amount & Save to Storage
  setDiscountAmount(amount: number) {
    this.discountAmount.next(amount);
    localStorage.setItem('discountAmount', amount.toString());
  }
 
  // ✅ Move Item from Wishlist to Cart
  moveFromWishlistToCart(item: any) {
    this.addToCart(item);
    this.wishlistService.removeFromWishlist(item.id);
  }

  
}
 
 