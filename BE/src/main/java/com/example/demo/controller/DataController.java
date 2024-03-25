package com.example.demo.controller;

import com.example.demo.entity.data.Course;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/data")
@RequiredArgsConstructor
public class DataController {

    @GetMapping
    public String get() {
        return "get:: manager controller";
    }

    @PostMapping
    public String post() {
        return "post:: manager controller";
    }

    @PutMapping
    public String put() {
        return "put:: manager controller";
    }

    @DeleteMapping
    public String delete() {
        return "delete:: admin controller";
    }
}
