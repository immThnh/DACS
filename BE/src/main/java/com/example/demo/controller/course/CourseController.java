package com.example.demo.controller.course;

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
    public ResponseEntity<ResponObject> create(@RequestPart CourseRequest course, @RequestPart(required = false) ArrayList<LessonRequest> lessons,
                                       @RequestPart MultipartFile thumbnail, @RequestPart(value = "videos", required = false) List<MultipartFile> videos ) throws InterruptedException {
        var result = courseService.addCourse(course, lessons, thumbnail, videos);
        return ResponseEntity.status(result.getStatus()).body(result);
    }

    @GetMapping("/getAll")
    public ResponseEntity<ResponObject> getAll() {
        var result = courseService.getAllCourse();
        return ResponseEntity.status(result.getStatus()).body(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponObject> getCourseById(@PathVariable int id) {
        var result = courseService.getCourseById(id);
        return ResponseEntity.status(result.getStatus()).body(result);
    }
    @GetMapping("/alias/{alias}")
    public ResponseEntity<ResponObject> getCourseByAlias(@PathVariable  String alias) {
        var result = courseService.getCourseByAlias(alias);
        return ResponseEntity.status(result.getStatus()).body(result);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<ResponObject> updateCourse(@PathVariable int id, @RequestPart CourseRequest course, @RequestPart List<LessonRequest> lessons, @RequestPart(required = false) MultipartFile thumbnail, @RequestPart(value = "videos", required = false) List<MultipartFile> videos)  {
           var result = courseService.updateCourse(id, course, lessons, thumbnail, videos);
           return ResponseEntity.status(result.getStatus()).body(result);
    }


    @PutMapping
    public String put() {
        return "put:: manager controller";
    }

    @DeleteMapping({"/delete/{id}"})
    public ResponseEntity<ResponObject> delete(@PathVariable int id) {
        var result = courseService.deleteCourseById(id);
        return ResponseEntity.status(result.getStatus()).body(result);
    }
}
