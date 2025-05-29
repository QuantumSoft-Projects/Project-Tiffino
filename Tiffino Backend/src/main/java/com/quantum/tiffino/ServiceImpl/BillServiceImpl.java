package com.quantum.tiffino.ServiceImpl;

import com.quantum.tiffino.Entity.Bill;

import com.quantum.tiffino.Entity.Order;

import com.quantum.tiffino.Exception.BillNotFoundException;

import com.quantum.tiffino.Repository.BillRepository;

import com.quantum.tiffino.Repository.OrderRepository;

import com.quantum.tiffino.Service.BillService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import java.util.Optional;

@Service

public class BillServiceImpl implements BillService {

  private final BillRepository billRepository;

  private final OrderRepository orderRepository;

  @Autowired

  public BillServiceImpl(BillRepository billRepository, OrderRepository orderRepository) {

    this.billRepository = billRepository;

    this.orderRepository = orderRepository;

  }

  @Override

  @Transactional

  public Bill createBill(Bill bill) {

    if (bill.getOrder() == null || bill.getOrder().getId() == null) {

      throw new IllegalArgumentException("❌ Order ID is required for Bill creation!");

    }

    Optional<Order> orderOptional = orderRepository.findById(bill.getOrder().getId());

    if (!orderOptional.isPresent()) {

      throw new IllegalArgumentException("❌ Order not found for Bill!");

    }

    Order order = orderOptional.get();

    bill.setOrder(order); // Ensure the bill is linked to the order

    order.setBill(bill);  // Ensure the order has the bill reference


    return billRepository.save(bill);

  }

  @Override

  public Bill getBillById(Long id) {

    return billRepository.findById(id)

      .orElseThrow(() -> new BillNotFoundException(id));

  }

  @Override

  public List<Bill> getAllBills() {

    return billRepository.findAll();

  }

}







