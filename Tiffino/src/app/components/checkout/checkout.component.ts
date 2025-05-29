import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  cartItems!: any[];
  subtotal!: number;
  gst!: number;
  deliveryCharge: number = 40.0;
  platformCharge!: number;
  grandTotal!: number;
  discount: number = 0.1;
  step!: number;
 
  orderId: string | number = '';
  userEmail: string = '';
 
  address = {
    fullName: '',
    email: '',
    phoneNumber: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    latitude: 19.0760,
    longitude: 72.8777,
    user: { id: 3 }
  };
 
  selectedPaymentMethod: string = 'card';
  userId: number = 5;
  restaurantId: number = 6;
 
  cardDetails = {
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  };
 
  apiUrl: string = 'http://localhost:8080/api/locations';
  orderApiUrl: string = 'http://localhost:8080/orders';
  billsApiUrl: string = 'http://localhost:8080/api/bills';
 
  orderReview = {
    totalItems: 0,
    totalGrossValue: 0,
    totalDiscount: 0,
    finalAmount: 0
  };
 
  constructor(
    private cartService: CartService,
    private router: Router,
    private http: HttpClient
  ) {
    this.step = 1;
  }
 
  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();
    this.updateOrderReview();
 
    if (this.cartItems.length === 0) {
      this.router.navigate(['/restaurant'], { replaceUrl: true });
    }
 
    this.userEmail = this.address.email;
  }
 
  calculateTotal() {
    this.subtotal = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    this.gst = this.subtotal * 0.18;
    this.platformCharge = this.subtotal * 0.05;
    this.grandTotal = this.subtotal + this.gst + this.deliveryCharge + this.platformCharge - (this.subtotal * this.discount);
    this.updateOrderReview();
  }
 
  updateOrderReview() {
    this.orderReview.totalItems = this.cartItems.reduce((count, item) => count + item.quantity, 0);
    this.orderReview.totalGrossValue = this.subtotal;
    this.orderReview.totalDiscount = this.subtotal * this.discount;
    this.orderReview.finalAmount = this.grandTotal;
  }
 
  nextStep() {
    if (this.step === 1) {
      if (!this.address.fullName || !this.address.email || !this.address.phoneNumber || !this.address.city || !this.address.state || !this.address.postalCode || !this.address.addressLine1) {
        alert('Please fill all required address fields.');
        return;
      }
 
      this.http.post(this.apiUrl, this.address).subscribe(
        (response) => {
          console.log('Address saved successfully', response);
          this.step++;
        },
        (error) => {
          console.error('Error saving address', error);
          alert('Error saving address. Please try again.');
        }
      );
    } else if (this.step === 2) {
      if (this.selectedPaymentMethod === 'card' && (!this.cardDetails.cardNumber || !this.cardDetails.cardHolder || !this.cardDetails.expiryDate || !this.cardDetails.cvv)) {
        alert('Please enter all required card details.');
        return;
      }
      this.step++;
    } else {
      this.step++;
    }
  }
 
  previousStep() {
    if (this.step > 1) {
      this.step--;
    }
  }
  placeOrder() {
    console.log("🚀 Placing order...");
 
    if (!this.userId) {
      console.error("❌ ERROR: userId is null or undefined!");
      alert("User information is missing. Please log in again.");
      return;
    }
 
    // ✅ Force Recalculation Before Sending Order
    this.calculateTotal();
    this.updateOrderReview();
 
    console.log("📊 Final Calculation Before Order:");
    console.log("Subtotal:", this.subtotal);
    console.log("GST:", this.gst);
    console.log("Platform Charge:", this.platformCharge);
    console.log("Grand Total:", this.grandTotal);
    console.log("Total Discount:", this.subtotal * this.discount);
 
    const orderData = {
      dateAndTime: new Date().toISOString(),
      orderStatus: "COMPLETED",
      restaurant: { id: this.restaurantId },
      user: { id: this.userId },
      totalGrossValue: this.subtotal,
      totalNetValue: this.grandTotal - this.gst - this.deliveryCharge - this.platformCharge,
      totalDiscount: this.subtotal * this.discount,
      deliveryCharges: this.deliveryCharge,
      platformCharges: this.platformCharge,
      gst: this.gst,
      grandTotal: this.grandTotal
    };
 
    console.log("📦 Sending Order Data:", orderData);
 
    this.http.post(this.orderApiUrl, orderData).subscribe(
      (orderResponse: any) => {
        console.log("✅ Order placed successfully!", orderResponse);
        this.cartService.clearCart();
 
        if (!orderResponse || !orderResponse.id) {
          console.error("❌ ERROR: orderResponse does not contain order ID!", orderResponse);
          return;
        }
 
        this.orderId = orderResponse.id;
        this.step = 4;
 
        // 🌟 Now, send the bill data
        this.storeBill(orderResponse);
      },
      (error) => {
        console.error("❌ Error placing order:", error);
        alert("Failed to place order. Please try again.");
      }
    );
}
 
  storeBill(orderResponse: any) {
    if (!orderResponse || !orderResponse.id) {
      console.error("❌ ERROR: orderResponse is invalid!", orderResponse);
      return;
    }
 
    const billData = {
      order: { id: orderResponse.id },
      user: { id: this.userId },
      restaurant: { id: this.restaurantId },
      totalAmount: this.grandTotal,
      discount: this.subtotal * this.discount,
      gst: this.gst,
      deliveryCharges: this.deliveryCharge,
      platformCharges: this.platformCharge,
      netAmount: this.grandTotal - this.gst - this.deliveryCharge - this.platformCharge
    };
 
    console.log("📑 Sending Bill Data:", billData);
 
    this.http.post(this.billsApiUrl, billData).subscribe(
      (billResponse) => {
        console.log("✅ Bill stored successfully!", billResponse);
      },
      (error) => {
        console.error("❌ Error storing bill:", error);
      }
    );
  }
 
  returnToShop() {
    this.router.navigate(['/restaurant']);
  }
}
 
 