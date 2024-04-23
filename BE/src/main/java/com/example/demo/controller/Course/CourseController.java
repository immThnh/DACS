package com.example.demo.controller.Course;

import com.example.demo.dto.ResponObject;
import com.example.demo.request.CourseRequest;
import com.example.demo.request.LessonRequest;
import com.example.demo.entity.data.Course;
import com.example.demo.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/data/course")
@RequiredArgsConstructor
public class CourseController {
    private final CourseService courseService;

    @PostMapping("/create")
    public ResponseEntity<String> create(@RequestPart CourseRequest course, @RequestPart(required = false) ArrayList<LessonRequest> lessons,
                                       @RequestPart MultipartFile thumbnail, @RequestPart(value = "videos", required = false) List<MultipartFile> videos ) throws InterruptedException {
        var result = courseService.addCourse(course, lessons, thumbnail, videos);
        return ResponseEntity.status(result.getStatus()).body(result.getContent().toString());
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Course>> getAll() {
        var result = courseService.getAllCourse();
        return ResponseEntity.status(result.getStatus()).body((List<Course>) result.getContent());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponObject> getCourseById(@PathVariable  int id) {
        var result = courseService.getCourseById(id);
        return ResponseEntity.status(result.getStatus()).body(result);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<String> updateCourse(@PathVariable int id, @RequestPart CourseRequest course, @RequestPart List<LessonRequest> lessons, @RequestPart(required = false) MultipartFile thumbnail, @RequestPart(value = "videos", required = false) List<MultipartFile> videos)  {
       try {
           var result = courseService.updateCourse(id, course, lessons, thumbnail, videos);
           return ResponseEntity.status(result.getStatus()).body(result.getContent().toString());
       }
       catch (Exception ex) {
           System.out.println("updateCourse: " + ex.getMessage());
           return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error updating course");
       }
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
