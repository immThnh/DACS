package com.example.demo.service;

import com.example.demo.entity.data.Course;
import com.example.demo.entity.data.Invoice;
import com.example.demo.entity.user.User;
import com.example.demo.repository.data.InvoiceRepository;
import com.fasterxml.jackson.dataformat.xml.ser.UnwrappingXmlBeanSerializer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class InvoiceService {
    private final InvoiceRepository invoiceRepository;

    public Invoice saveForUser(User user, Course course) {
        Invoice invoice = Invoice.builder()
                .user(user)
                .date(LocalDateTime.now())
                .content("Invoice for course " + course.getTitle())
                .course(course)
                .total(course.getPrice())
                .build();
        return invoiceRepository.save(invoice);
    }
}
