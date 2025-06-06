package com.quantum.tiffino.Controller;

import com.quantum.tiffino.Entity.CustomerSupportTicket;

import com.quantum.tiffino.Service.CustomerSupportTicketService;

import com.quantum.tiffino.Exception.TicketNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController

@RequestMapping("/api/tickets")

public class CustomerSupportTicketController {

  private final CustomerSupportTicketService ticketService;

  @Autowired

  public CustomerSupportTicketController(CustomerSupportTicketService ticketService) {

    this.ticketService = ticketService;

  }

  @PostMapping

  public ResponseEntity<CustomerSupportTicket> createTicket(@RequestBody CustomerSupportTicket ticket) {

    ticket.setCreatedAt(java.time.LocalDate.now()); // Set the created date

    ticket.setStatus(CustomerSupportTicket.Status.OPEN); // Default status to OPEN

    CustomerSupportTicket createdTicket = ticketService.createTicket(ticket);

    return new ResponseEntity<>(createdTicket, HttpStatus.CREATED);

  }


  @GetMapping("/{ticketId}")

  public ResponseEntity<CustomerSupportTicket> getTicketById(@PathVariable long ticketId) {

    try {

      CustomerSupportTicket ticket = ticketService.getTicketById(ticketId);

      return new ResponseEntity<>(ticket, HttpStatus.OK);

    } catch (TicketNotFoundException ex) {

      return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);

    }

  }

  @GetMapping

  public ResponseEntity<List<CustomerSupportTicket>> getAllTickets() {

    List<CustomerSupportTicket> tickets = ticketService.getAllTickets();

    return new ResponseEntity<>(tickets, HttpStatus.OK);

  }

  @PutMapping("/{ticketId}/status")

  public ResponseEntity<CustomerSupportTicket> updateTicketStatus(@PathVariable long ticketId, @RequestParam String status) {

    try {

      CustomerSupportTicket updatedTicket = ticketService.updateTicketStatus(ticketId, status);

      if (status.equalsIgnoreCase("RESOLVED")) {

        updatedTicket.setResolvedAt(java.time.LocalDate.now()); // Set resolved date

      }

      return new ResponseEntity<>(updatedTicket, HttpStatus.OK);

    } catch (IllegalArgumentException ex) {

      return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

    }

  }

  @DeleteMapping("/{ticketId}")

  public ResponseEntity<Map<String, String>> deleteTicket(@PathVariable long ticketId) {

    ticketService.deleteTicket(ticketId);

    Map<String, String> response = new HashMap<>();

    response.put("message", "Ticket deleted successfully");

    return new ResponseEntity<>(response, HttpStatus.OK);

  }



}





