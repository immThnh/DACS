package com.example.demo.controller.course;

import com.example.demo.dto.ResponseObject;
import com.example.demo.dto.CourseDTO;
import com.example.demo.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/data/course")
@RequiredArgsConstructor
public class CourseController {
    private final CourseService courseService;

    @PostMapping("/create")
    public ResponseEntity<ResponseObject> create(@RequestPart CourseDTO course
            , @RequestPart(required = false) MultipartFile thumbnail
            , @RequestPart(required = false) MultipartFile courseVideo
            , @RequestPart(value = "videos", required = false) List<MultipartFile> videos ) {
        var result = courseService.addCourse(course, thumbnail, courseVideo, videos);
        return ResponseEntity.status(result.getStatus()).body(result);
    }



    @GetMapping("/getAll")
    public ResponseEntity<ResponseObject> getAllByPageable(@RequestParam(defaultValue = "0") int page,
                                                           @RequestParam(defaultValue = "5") int size) {
        var result = courseService.getAllByPageable(page, size);
        return ResponseEntity.status(result.getStatus()).body(result);
    }

    @GetMapping("/getAllDeleted")
    public ResponseEntity<ResponseObject> getAllDeleted(@RequestParam(defaultValue = "0") int page,
                                                        @RequestParam(defaultValue = "5") int size) {
        var result = courseService.getAllCourseDeleted(page, size);
        return ResponseEntity.status(result.getStatus()).body(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject> getCourseById(@PathVariable int id) {
        var result = courseService.getCourseById(id);
        return ResponseEntity.status(result.getStatus()).body(result);
    }

    @GetMapping("/category")
    public ResponseEntity<ResponseObject> getCourseByCategoryId(@RequestParam("id") int id, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "5") int size) {
        var result = courseService.getAllCourseByCategoryId(id, page, size);
        return ResponseEntity.status(result.getStatus()).body(result);
    }  @GetMapping("/deleted/category")
    public ResponseEntity<ResponseObject> getCourseDeletedByCategoryId(@RequestParam("id") int id, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "5") int size) {
        var result = courseService.getAllCourseDeletedByCategoryId(id, page, size);
        return ResponseEntity.status(result.getStatus()).body(result);
    }
    @GetMapping("")
    public ResponseEntity<ResponseObject> getCourseByCourseTitle(@RequestParam("title") String title,
                                                                 @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "5") int size) {
        System.out.println(title);
        var result = courseService.getAllCourseByCourseTitle(title, page, size);
        return ResponseEntity.status(result.getStatus()).body(result);
    }


// @GetMapping("")
//    public ResponseEntity<ResponObject> getCourseByCategoryIdAndCourseTitle(@RequestParam("category") int id, @RequestParam("title") String title) {
//        var result = courseService.getAllCourseByCategoryIdAndTitle(id, title);
//        return ResponseEntity.status(result.getStatus()).body(result);
//    }

//    @GetMapping("/alias/{alias}")
//    public ResponseEntity<ResponObject> getCourseByAlias(@PathVariable  String alias) {
//        var result = courseService.getCourseByAlias(alias);
//        return ResponseEntity.status(result.getStatus()).body(result);
//    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<ResponseObject> updateCourse(@PathVariable int id, @RequestPart CourseDTO course
            , @RequestPart(required = false) MultipartFile thumbnail, @RequestPart(required = false) MultipartFile courseVideo, @RequestPart(value = "videos", required = false) List<MultipartFile> videos)  {

           var result = courseService.updateCourse(id, course, thumbnail, courseVideo, videos);
           return ResponseEntity.status(result.getStatus()).body(result);
    }



    @PutMapping("/restore/{id}")
    public ResponseEntity<ResponseObject> restoreCourse(@PathVariable int id) {
        var result = courseService.restoreCourseById(id);
        return ResponseEntity.status(result.getStatus()).body(result);
    }
    @PutMapping
    public String put() {
        return "put:: manager controller";
    }

    @PutMapping("/delete/soft/{id}")
    public ResponseEntity<ResponseObject> softDelete(@PathVariable int id) {
        var result = courseService.softDelete(id);
        return ResponseEntity.status(result.getStatus()).body(result);
    }

    @DeleteMapping("/delete/hard/{id}")
    public ResponseEntity<ResponseObject> hardDelete(@PathVariable int id) {
        var result = courseService.hardDelete(id);
        return ResponseEntity.status(result.getStatus()).body(result);
    }
}
