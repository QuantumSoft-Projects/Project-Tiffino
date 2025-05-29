package com.quantum.tiffino.Controller;

import com.quantum.tiffino.Entity.Bill;

import com.quantum.tiffino.Entity.Order;

import com.quantum.tiffino.Entity.User;

import com.quantum.tiffino.Service.BillService;

import com.quantum.tiffino.Repository.UserRepository;

import com.quantum.tiffino.Repository.OrderRepository;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

import java.util.Optional;

@RestController

@RequestMapping("/api/bills")

@CrossOrigin("*")

public class BillController {

  private final BillService billService;

  private final UserRepository userRepository;

  private final OrderRepository orderRepository;

  @Autowired

  public BillController(BillService billService, UserRepository userRepository, OrderRepository orderRepository) {

    this.billService = billService;

    this.userRepository = userRepository;

    this.orderRepository = orderRepository;

  }

  @PostMapping

  public ResponseEntity<?> createBill(@RequestBody Bill bill) {

    if (bill.getOrder() == null || bill.getOrder().getId() == null) {

      return ResponseEntity.status(HttpStatus.BAD_REQUEST)

        .body("❌ Order ID is required for Bill creation!");

    }

    if (bill.getUser() == null || bill.getUser().getId() == null) {

      return ResponseEntity.status(HttpStatus.BAD_REQUEST)

        .body("❌ User ID is required for Bill creation!");

    }

    Optional<Order> orderOptional = orderRepository.findById(bill.getOrder().getId());

    if (!orderOptional.isPresent()) {

      return ResponseEntity.status(HttpStatus.NOT_FOUND)

        .body("❌ Order not found with ID: " + bill.getOrder().getId());

    }

    Optional<User> userOptional = userRepository.findById(bill.getUser().getId());

    if (!userOptional.isPresent()) {

      return ResponseEntity.status(HttpStatus.NOT_FOUND)

        .body("❌ User not found with ID: " + bill.getUser().getId());

    }

    bill.setOrder(orderOptional.get());

    bill.setUser(userOptional.get());

    Bill createdBill = billService.createBill(bill);

    return ResponseEntity.status(HttpStatus.CREATED).body(createdBill);

  }


  @GetMapping("/{id}")

  public ResponseEntity<Bill> getBillById(@PathVariable Long id) {

    Bill bill = billService.getBillById(id);

    return new ResponseEntity<>(bill, HttpStatus.OK);

  }

  @GetMapping

  public ResponseEntity<List<Bill>> getAllBills() {

    List<Bill> bills = billService.getAllBills();

    return new ResponseEntity<>(bills, HttpStatus.OK);

  }

}


