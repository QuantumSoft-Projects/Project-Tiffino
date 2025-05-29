import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // ✅ Import Router
 
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalAmount: number = 0;
  orderSummaryVisible: boolean = false;
  couponCode: string = '';
  discountAmount: number = 0;
 
  constructor(public cartService: CartService, private router: Router) {} // ✅ Inject Router
 
  ngOnInit() {
    this.loadCart();
  }
 
  loadCart() {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();
  }
 
  increaseQuantity(item: any) {
    this.cartService.addToCart(item);
    this.loadCart();
  }
 
  decreaseQuantity(item: any) {
    this.cartService.decreaseFromCart(item.id);
    this.loadCart();
  }
 
  removeItem(itemId: number) {
    this.cartService.removeFromCart(itemId);
    this.loadCart();
  }
 
  // ✅ Define checkout() Method
  checkout() {
    this.router.navigate(['/checkout']); // ✅ Navigate to Checkout Page
  }
 
  applyCoupon() {
    if (!this.couponCode) {
      alert("Please enter a coupon code!");
      return;
    }
 
    this.cartService.applyCoupon(this.couponCode).subscribe({
      next: (response: any) => {  // ✅ Explicitly define response type
        if (response && response.discountPercentage) {
          const discount = (this.totalAmount * response.discountPercentage) / 100;
          this.discountAmount = discount;
          alert(`Coupon applied! You saved ₹${discount}`);
          this.calculateTotal();
        } else {
          alert("Invalid coupon code!");
        }
      },
      error: () => {
        alert("Failed to apply coupon. Try again!");
      }
    });
  }
 
  calculateTotal() {
    this.totalAmount = this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    this.totalAmount -= this.discountAmount;
  }
 
  returnToShop() {
    this.router.navigate(['/shop']);
  }
}
 
 