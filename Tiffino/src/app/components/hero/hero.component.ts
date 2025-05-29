import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  thalis = [
    { id: 1, name: 'North Indian Thali', image: 'assets/img/thali1.png', price: 250 },
    { id: 2, name: 'South Indian Thali', image: 'assets/img/thali2.png', price: 250 },
    { id: 3, name: 'Gujarati Thali', image: 'assets/img/thali3.png', price: 250 },
    { id: 4, name: 'Rajasthani Thali', image: 'assets/img/thali4.png', price: 250 },
    { id: 5, name: 'Maharashtrian Thali', image: 'assets/img/thali5.png', price: 250 },
    { id: 6, name: 'Punjabi Thali', image: 'assets/img/thali6.png', price: 250 }, // ✅ Added ID
    { id: 7, name: 'Bengali Thali', image: 'assets/img/thali7.png', price: 250 }, // ✅ Added ID
    { id: 8, name: 'Odisa Thali', image: 'assets/img/thali8.png', price: 250 },
    { id: 9, name: 'Bihari Thali', image: 'assets/img/thali9.png', price: 250 },
    { id: 10, name: 'Assamee Thali', image: 'assets/img/thali10.png', price: 250 },
    { id: 11, name: 'Goa Thali', image: 'assets/img/thali11.png', price: 250 },
    { id: 12, name: 'Kashmiri Thali', image: 'assets/img/thali12.png', price: 250 },
    { id: 13, name: 'Hyderabadi Thali', image: 'assets/img/thali13.png', price: 250 },
    { id: 14, name: 'Kerala Sadhya', image: 'assets/img/thali14.png', price: 250 },
    { id: 15, name: 'Tamil Nadu Thali', image: 'assets/img/thali15.png', price: 250 },
    { id: 16, name: 'Andhra Thali', image: 'assets/img/thali16.png', price: 250 },
    { id: 17, name: 'Manipuri Thali', image: 'assets/img/thali17.png', price: 250 },
    { id: 18, name: 'Meghalaya Thali', image: 'assets/img/thali18.png', price: 250 },
    { id: 19, name: 'Mizoram Thali', image: 'assets/img/thali19.png', price: 250 },
    { id: 20, name: 'Nagaland Thali', image: 'assets/img/thali20.png', price: 250 },
    { id: 21, name: 'Tripura Thali', image: 'assets/img/thali21.png', price: 250 },
    { id: 22, name: 'Arunachal Thali', image: 'assets/img/thali22.png', price: 250 }
  ];

  constructor(private cartService: CartService) {}

  addToCart(thali: any) {
    this.cartService.addToCart(thali);
    alert(`${thali.name} added to cart for ₹250!`);
  }
}
