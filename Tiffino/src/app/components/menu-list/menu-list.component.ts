import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [HttpClientModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {
  menuItems: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchMenuItems();
  }

  fetchMenuItems() {
    this.http.get<any[]>('http://localhost:8080/api/menus').subscribe(
      (data) => {
        this.menuItems = data;
      },
      (error) => {
        console.error('Error fetching menu items:', error);
      }
    );
  }
}
