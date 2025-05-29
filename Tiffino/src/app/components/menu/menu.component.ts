import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  menuForm!: FormGroup;
  menuItems: any[] = []; 
  selectedFile: File | null = null;
  imageUrl: string = ''; // Store uploaded image preview URL

  regions = [
    { id: 1, name: "Northern India" },
    { id: 2, name: "Central India" },
    { id: 3, name: "Western India" },
    { id: 4, name: "Eastern India" },
    { id: 5, name: "Northeastern India" },
    { id: 6, name: "Southern India" },
    { id: 7, name: "Union Territories" }
  ];
  
  restaurants = [
    { id: 1, name: "The Grand Restaurant" },
    { id: 2, name: "Spice Delight" },
    { id: 3, name: "Taste of India" },
    { id: 4, name: "Flavors of South" },
    { id: 5, name: "North Indian Dhaba" }
  ];

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.menuForm = this.fb.group({
      itemName: ['', Validators.required],
      category: ['', Validators.required],
      cuisineType: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      regionId: ['', Validators.required],
      restaurantId: ['', Validators.required],
      imageUrl: ['']
    });
  }

  submitMenu() {
    if (this.menuForm.valid) {
      const formData = new FormData();
      formData.append("itemName", this.menuForm.value.itemName);
      formData.append("category", this.menuForm.value.category);
      formData.append("cuisineType", this.menuForm.value.cuisineType);
      formData.append("startDate", this.menuForm.value.startDate);
      formData.append("endDate", this.menuForm.value.endDate);
      formData.append("regionId", this.menuForm.value.regionId);
      formData.append("restaurantId", this.menuForm.value.restaurantId);
      
      if (this.selectedFile) {
        formData.append("file", this.selectedFile);
      }

      this.http.post('http://localhost:8080/api/menus', formData).subscribe(response => {
        alert('Menu Item Added Successfully!');
        
        // Add item to menuItems array for UI display
        this.menuItems.push({
          itemName: this.menuForm.value.itemName,
          category: this.menuForm.value.category,
          cuisineType: this.menuForm.value.cuisineType,
          startDate: this.menuForm.value.startDate,
          endDate: this.menuForm.value.endDate,
          region: this.regions.find(r => r.id == this.menuForm.value.regionId)?.name || 'Unknown',
          restaurant: this.restaurants.find(r => r.id == this.menuForm.value.restaurantId)?.name || 'Unknown',
          imageUrl: this.imageUrl
        });

        this.menuForm.reset();
        this.imageUrl = ''; // Reset image preview
        this.selectedFile = null;
      }, error => {
        console.error('Error:', error);
        alert('Failed to add menu item');
      });
    }
  }

  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Preview Image
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result as string;
      };
    }
  }
}
