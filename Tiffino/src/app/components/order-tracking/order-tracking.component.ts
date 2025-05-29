import { Component } from '@angular/core';
import { RealTimeTrackingService } from '../../services/real-time-tracking.service';

@Component({
  selector: 'app-order-tracking',
  standalone: true,
  imports: [],
  templateUrl: './order-tracking.component.html',
  styleUrl: './order-tracking.component.css'
})
export class OrderTrackingComponent {
  trackingData: any = {};
  orderId: string = '12345'; // Example order ID

  constructor(private trackingService: RealTimeTrackingService) {}

  ngOnInit(): void {
    this.trackingService.getTrackingUpdates(this.orderId).subscribe(data => {
      this.trackingData = data;  // Update UI with real-time data
    });
  }

}
