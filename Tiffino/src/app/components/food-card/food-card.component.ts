import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-food-card',
  standalone: true,
  imports: [],
  templateUrl: './food-card.component.html',
  styleUrl: './food-card.component.css'
})
export class FoodCardComponent implements OnInit {
  location: string | null = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Retrieve the 'location' route parameter
    this.route.paramMap.subscribe(params => {
      this.location = params.get('location');
    });
  }
  
  

}
