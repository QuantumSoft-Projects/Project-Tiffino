import { Component, OnInit } from '@angular/core';
import { CustomerSupportService } from '../../services/customer-support.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-support',
  templateUrl: './customer-support.component.html',
  styleUrls: ['./customer-support.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class CustomerSupportComponent implements OnInit {
  tickets: any[] = [];
  statusOptions = ['OPEN', 'RESOLVED', 'CLOSED']; // Add this

  newTicket = {
    customerName: '',
    issueType: '',
    description: '',
    status: 'OPEN',
    createdAt: '',  // Added createdAt field
    resolvedAt: null // Added resolvedAt field

  };
  selectedTicket: any = null;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private supportService: CustomerSupportService) {}

  ngOnInit() {
    this.loadTickets();
  }

  loadTickets() {
    this.supportService.getAllTickets().subscribe(
      (data) => {
        this.tickets = data;
      },
      (error) => {
        console.error('Error fetching tickets:', error);
      }
    );
  }

  submitTicket() {
    console.log("Submitting ticket:", this.newTicket); // Debugging
  
    this.newTicket.createdAt = new Date().toISOString().split('T')[0]; // Ensure createdAt is set
    this.newTicket.resolvedAt = null; // Ensure resolvedAt is null initially
  
    this.supportService.createTicket(this.newTicket).subscribe(
      (response) => {
        console.log("Response from backend:", response); // Debugging
  
        this.successMessage = 'Ticket created successfully!';
        this.loadTickets(); // Refresh the list
  
        // Reset form
        this.newTicket = {
          customerName: '',
          issueType: '',
          description: '',
          status: 'OPEN',
          createdAt: '',
          resolvedAt: null
        };
      },
      (error) => {
        this.errorMessage = 'Failed to create ticket!';
        console.error("Error:", error);
      }
    );
  }
  
  

  updateStatus(ticketId: number, newStatus: string) {
    this.supportService.updateTicketStatus(ticketId, newStatus).subscribe(
      () => {
        this.successMessage = 'Ticket status updated!';
        this.loadTickets();
      },
      (error) => {
        this.errorMessage = 'Failed to update status!';
        console.error(error);
      }
    );
  }
  deleteTicket(ticketId: number) {
    if (confirm('Are you sure you want to delete this ticket?')) {
      this.supportService.deleteTicket(ticketId).subscribe(
        () => {
          this.successMessage = 'Ticket deleted successfully!';
          this.loadTickets();
        },
        (error) => {
          this.errorMessage = 'Failed to delete ticket!';
          console.error(error);
        }
      );
    }
  }
  }
  
  
  

