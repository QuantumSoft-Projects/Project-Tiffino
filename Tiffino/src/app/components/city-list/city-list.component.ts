import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-city-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent {
  data: any = {
    AndhraPradesh: {
      Visakhapatnam: [
        { "name": "Pootharekulu", "price": 150, "rating": 4.5, "deliveryTime": 25, "image": "assets/img/Pootharekulu.png" },
        { "name": "Punugulu", "price": 120, "rating": 4.3, "deliveryTime": 20, "image": "assets/img/Punugulu.png" },
        { "name": "Guntur Chicken", "price": 250, "rating": 4.6, "deliveryTime": 30, "image": "assets/img/Guntur-Chicken.png" },
        { "name": "Tirupati Laddu", "price": 100, "rating": 4.8, "deliveryTime": 15, "image": "assets/img/Tirupati-Laddu.png" },
        { "name": "Kakinada Kaja", "price": 130, "rating": 4.4, "deliveryTime": 25, "image": "assets/img/KakinadaKaja.png" }
      ],
      Vijayawada: [
        { "name": "Bobbattu", "price": 140, "rating": 4.5, "deliveryTime": 20, "image": "assets/img/Bobbattu.png" }
      ],
      Guntur: [
        { "name": "Gongura Mutton", "price": 280, "rating": 4.7, "deliveryTime": 35, "image": "assets/img/Gongura-Mutton.png" }
      ],
      Tirupati: [
        { "name": "Pulihora", "price": 110, "rating": 4.6, "deliveryTime": 18, "image": "assets/img/Pulihora.png" }
      ],
      Kurnool: [
        { "name": "Ulava Charu", "price": 160, "rating": 4.4, "deliveryTime": 22, "image": "assets/img/Ulava-Charu.png" }
      ]
    
  },  
    ArunachalPradesh: {
      Itanagar: [
        { name: 'Thukpa', price: 120, rating: 4.6, deliveryTime: 20, image: 'assets/images/thukpa.jpg' }
      ]
    },
    Assam: {
      Dispur: [
        { name: 'Masor Tenga', price: 200, rating: 4.7, deliveryTime: 30, image: 'assets/images/masor-tenga.jpg' }
      ]
    },
    Bihar: {
      Patna: [
        { name: 'Litti Chokha', price: 100, rating: 4.5, deliveryTime: 25, image: 'assets/images/litti-chokha.jpg' }
      ]
    },
    Chhattisgarh: {
      Raipur: [
        { name: 'Chana Samosa', price: 50, rating: 4.4, deliveryTime: 15, image: 'assets/images/chana-samosa.jpg' }
      ]
    },
    Goa: {
      Panaji: [
        { name: 'Prawn Balchao', price: 300, rating: 4.8, deliveryTime: 35, image: 'assets/images/prawn-balchao.jpg' }
      ]
    },
    Gujarat: {
      Gandhinagar: [
        { name: 'Dhokla', price: 80, rating: 4.6, deliveryTime: 20, image: 'assets/images/dhokla.jpg' }
      ]
    },
    Haryana: {
      Chandigarh: [
        { name: 'Bajra Khichdi', price: 90, rating: 4.5, deliveryTime: 15, image: 'assets/images/bajra-khichdi.jpg' }
      ]
    },
    HimachalPradesh: {
      Shimla: [
        { name: 'Siddu', price: 110, rating: 4.6, deliveryTime: 25, image: 'assets/images/siddu.jpg' }
      ]
    },
    Jharkhand: {
      Ranchi: [
        { name: 'Thekua', price: 70, rating: 4.5, deliveryTime: 20, image: 'assets/images/thekua.jpg' }
      ]
    },
    Karnataka: {
      Bangalore: [
        { name: 'Bisi Bele Bath', price: 120, rating: 4.6, deliveryTime: 30, image: 'assets/images/bisi-bele-bath.jpg' }
      ]
    },
    Kerala: {
      Thiruvananthapuram: [
        { name: 'Puttu and Kadala Curry', price: 150, rating: 4.7, deliveryTime: 25, image: 'assets/images/puttu-kadala.jpg' }
      ]
    },
    MadhyaPradesh: {
      Bhopal: [
        { name: 'Poha Jalebi', price: 60, rating: 4.5, deliveryTime: 20, image: 'assets/images/poha-jalebi.jpg' }
      ]
    },
    Maharashtra: {
      Mumbai: [
        { name: 'Vada Pav', price: 20, rating: 4.7, deliveryTime: 15, image: 'assets/images/vadapav.png' }
      ]
    },
    Manipur: {
      Imphal: [
        { name: 'Eromba', price: 130, rating: 4.6, deliveryTime: 20, image: 'assets/images/eromba.jpg' }
      ]
    },
    Meghalaya: {
      Shillong: [
        { name: 'Jadoh', price: 140, rating: 4.7, deliveryTime: 25, image: 'assets/images/jadoh.jpg' }
      ]
    },
    Mizoram: {
      Aizawl: [
        { name: 'Bai', price: 110, rating: 4.5, deliveryTime: 20, image: 'assets/images/bai.jpg' }
      ]
    },
    Nagaland: {
      Kohima: [
        { name: 'Smoked Pork', price: 200, rating: 4.8, deliveryTime: 30, image: 'assets/images/smoked-pork.jpg' }
      ]
    },
    Odisha: {
      Bhubaneswar: [
        { name: 'Chhena Poda', price: 90, rating: 4.6, deliveryTime: 25, image: 'assets/images/chhena-poda.jpg' }
      ]
    },
    Punjab: {
      Amritsar: [
        { name: 'Amritsari Kulcha', price: 100, rating: 4.7, deliveryTime: 20, image: 'assets/images/amritsari-kulcha.jpg' }
      ]
    },
    Rajasthan: {
      Jaipur: [
        { name: 'Dal Baati Churma', price: 150, rating: 4.8, deliveryTime: 30, image: 'assets/images/dal-baati-churma.jpg' }
      ]
    },
    Sikkim: {
      Gangtok: [
        { name: 'Phagshapa', price: 160, rating: 4.6, deliveryTime: 25, image: 'assets/images/phagshapa.jpg' }
      ]
    },
    TamilNadu: {
      Chennai: [
        { name: 'Dosa', price: 80, rating: 4.7, deliveryTime: 20, image: 'assets/images/dosa.jpg' }
      ]
    },
    Telangana: {
      Hyderabad: [
        { name: 'Hyderabadi Biryani', price: 250, rating: 4.9, deliveryTime: 30, image: 'assets/images/hyderabadi-biryani.jpg' }
      ]
    },
    Tripura: {
      Agartala: [
        { name: 'Mui Borok', price: 130, rating: 4.5, deliveryTime: 20, image: 'assets/images/mui-borok.jpg' }
      ]
    },
    UttarPradesh: {
      Lucknow: [
        { name: 'Tunday Kababi', price: 220, rating: 4.8, deliveryTime: 30, image: 'assets/images/tunday-kababi.jpg' }
      ]
    },
    Uttarakhand: {
      Dehradun: [
        { name: 'Aloo Ke Gutke', price: 100, rating: 4.6, deliveryTime: 25, image: 'assets/images/aloo-ke-gutke.jpg' }
      ]
    },
    WestBengal: {
      Kolkata: [
        { name: 'Rosogolla', price: 50, rating: 4.9, deliveryTime: 15, image: 'assets/images/rosogolla.jpg' }
      ]
    }
  };


  states: string[];
  cities: string[] = [];
  selectedState: string = '';
  selectedCity: string = '';
  foods: any[] = [];

  cart: any[] = [];
  wishlist: any[] = [];

  constructor() {
    this.states = Object.keys(this.data);
  }

  onStateChange() {
    this.cities = this.selectedState ? Object.keys(this.data[this.selectedState]) : [];
    this.selectedCity = '';
    this.foods = [];
  }

  onCityChange() {
    this.foods = this.selectedCity ? this.data[this.selectedState][this.selectedCity] : [];
  }

  addToCart(food: any) {
    this.cart.push(food);
    alert(`${food.name} added to cart!`);
  }

  addToWishlist(food: any) {
    this.wishlist.push(food);
    alert(`${food.name} added to wishlist!`);
  }
}
