package com.example.demo.controller;

import com.example.demo.data.CourseRequest;
import com.example.demo.service.DataService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/data")
@RequiredArgsConstructor
public class DataController {
    private final DataService dataService;

    @PostMapping("/course")
    public ResponseEntity<String> post(@RequestPart CourseRequest course, @RequestPart("thumbnail")MultipartFile thumbnail) {
        dataService.addCourse(course, thumbnail);
        return ResponseEntity.ok("Thêm khóa học thành công!");
    }

    @PostMapping("/course/lesson")

    @PutMapping
    public String put() {
        return "put:: manager controller";
    }

    @DeleteMapping
    public String delete() {
        return "delete:: admin controller";
    }
}
