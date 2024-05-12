package com.example.demo.controller.PublicController;

import com.example.demo.dto.ResponseObject;
import com.example.demo.dto.CourseDTO;
import com.example.demo.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/public/course")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class PCourseController {
    private final CourseService courseService;

    @GetMapping("/getAll")
    public ResponseEntity<ResponseObject> getAllByPageable(@RequestParam(defaultValue = "0") int page,
                                                           @RequestParam(defaultValue = "5") int size) {
        var result = courseService.getAllByPageable(page, size);
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

}