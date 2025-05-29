import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MembershipService } from '../../services/membership.service';


@Component({
  selector: 'app-membership',
  standalone: true,
  imports: [CommonModule,FormsModule],

  templateUrl: './membership.component.html',
  styleUrl: './membership.component.css'
})
export class MembershipComponent {
  userId: number = 0;
  membershipType: string = 'BRONZE';
  message: string = '';

  constructor(private membershipService: MembershipService) {}

  assignMembership() {
    if (!this.userId) {
      this.message = 'Please enter a valid User ID';
      return;
    }

    this.membershipService.assignMembership(this.userId, this.membershipType)
      .subscribe({
        next: (response) => {
          this.message = `Membership assigned successfully: ${this.membershipType}`;
        },
        error: (error) => {
          console.error('Error assigning membership:', error);
          this.message = 'Failed to assign membership. Please try again.';
        }
      });
  }
}
