import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
 
interface Restaurant {
  name: string;
  image: string;
  price: number;  
  region: string;
  rating: number;
  deliveryTime: string;
  cuisine: string;
}          
 
@Component({
  selector: 'app-restaurants',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent {
  searchQuery: string = '';
  activeDropdown: string | null = null;  // Track open dropdown
 
  selectedFilters: Partial<Record<keyof Restaurant, any>> = {};
 
  regions: string[] = ['Northern India', 'Southern India', 'Eastern India', 'Western India', 'North Eastern India'];
  ratings: number[] = [4, 3, 2, 1];
  deliveryTimes: string[] = ['30 min', '30-45 min', '45-60 min'];
  cuisines: string[] = ['North Indian', 'South Indian', 'Chinese', 'Italian'];
 
  restaurants: Restaurant[] = [
    { name: 'Spicy Tandoor', image: "assets/img/Spicy-tandoor.png", price: 250, region: 'Northern India', rating: 4, deliveryTime: '30 min', cuisine: 'North Indian' },
    { name: 'South Curry', image: "assets/img/South-Curry.png", price: 200, region: 'Southern India', rating: 3, deliveryTime: '30-45 min', cuisine: 'South Indian' },
    { name: 'Chow Mein House', image: "assets/img/Chow-Mein-House.png", price: 180, region: 'Eastern India', rating: 4, deliveryTime: '45-60 min', cuisine: 'Chinese' },
    { name: 'Pasta Hub', image: "assets/img/Pasta-Hub.png", price: 300, region: 'Western India', rating: 5, deliveryTime: '30 min', cuisine: 'Italian' },
    { name: 'Biryani King', image: "assets/img/biryani-king.png", price: 280, region: 'Northern India', rating: 4, deliveryTime: '30 min', cuisine: 'North Indian' }
  ];
 
  filteredRestaurants: Restaurant[] = [...this.restaurants];
 
  // Function to handle dropdown toggle (closes others)
  toggleDropdown(type: string) {
    this.activeDropdown = this.activeDropdown === type ? null : type;
  }
 
  selectFilter(type: keyof Restaurant, value: any) {
    this.selectedFilters[type] = value;
    this.activeDropdown = null;  // Close dropdown
    this.applyFilters();
  }
 
  applyFilters() {
    this.filteredRestaurants = this.restaurants.filter(res =>
      Object.entries(this.selectedFilters).every(([key, value]) => res[key as keyof Restaurant] === value) &&
      res.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
 
  // ✅ Fix for TypeScript error: Return as `any[]`
  getCategoryItems(category: string): any[] {
    switch (category) {
      case 'regions': return this.regions as any[];
      case 'ratings': return this.ratings as any[];
      case 'deliveryTime': return this.deliveryTimes as any[];
      case 'cuisines': return this.cuisines as any[];
      default: return [];
    }
  }
}
 
 