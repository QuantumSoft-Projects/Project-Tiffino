import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class RealTimeTrackingService {
  private socket: any;
  private serverUrl = 'http://your-server-url';  // Replace with your backend URL

  constructor() {
    this.socket = io(this.serverUrl);
  }

  // Emit event to update delivery status
  updateTrackingStatus(orderId: string, status: string): void {
    this.socket.emit('update-status', { orderId, status });
  }

 // Listen for real-time tracking updates
 getTrackingUpdates(orderId: string) {
  return new Observable(observer => {
    this.socket.on(`tracking-update-${orderId}`, (data: any) => {
      observer.next(data);
    });
    });
  }
}
