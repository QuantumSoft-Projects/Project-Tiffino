import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements AfterViewInit {
  isSidebarOpen = true;
  isSettingsMenuOpen = false;
  activeTab: string = 'dashboard';

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('adminToken');
    this.router.navigate(['/admin-login']);
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleSettingsMenu() {
    this.isSettingsMenuOpen = !this.isSettingsMenuOpen;
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  ngAfterViewInit() {
    setTimeout(() => this.initializeCharts(), 0);
  }

  private initializeCharts() {
    this.createChart('ordersChart', 'line', ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], [10, 25, 40, 30, 50, 70, 90], 'Orders', 'blue', true);
    this.createChart('revenueChart', 'bar', ['UPI', 'Card', 'Cash'], [50000, 30000, 20000], 'Revenue (₹)', ['green', 'blue', 'red']);
    this.createChart('foodChart', 'pie', ['Pizza', 'Burger', 'Pasta', 'Biryani'], [40, 30, 20, 50], 'Popular Items', ['orange', 'yellow', 'brown', 'green']);
    this.createChart('deliveryChart', 'doughnut', ['On Time', 'Late', 'Cancelled'], [80, 15, 5], 'Deliveries', ['green', 'red', 'gray']);

    // Adding the rating chart with a curve
    this.createChart('ratingChart', 'line', ['1⭐', '2⭐', '3⭐', '4⭐', '5⭐'], [20, 50, 80, 150, 700], 'Customer Ratings', 'purple', true);
  }

  private createChart(id: string, type: string, labels: string[], data: number[], label: string, colors: string | string[], showDataLabels: boolean = false) {
    const ctx = (document.getElementById(id) as HTMLCanvasElement)?.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: type as any,
        data: {
          labels: labels,
          datasets: [{
            label: label,
            data: data,
            borderColor: typeof colors === 'string' ? colors : undefined,
            backgroundColor: Array.isArray(colors) ? colors : undefined,
            fill: type === 'line' ? true : undefined,
            tension: 0.4 // Smooth curve effect
          }]
        },
        options: showDataLabels ? {
          plugins: {
            datalabels: {
              anchor: 'end',
              align: 'top',
              color: 'black',
              font: { weight: 'bold' }
            }
          },
          responsive: true,
          scales: {
            y: { beginAtZero: true }
          }
        } : {},
        plugins: showDataLabels ? [ChartDataLabels] : []
      });
    }
  }
}
