package com.example.demo.controller.PublicController;

import com.example.demo.dto.ResponseObject;
import com.example.demo.repository.data.LessonRepository;
import com.example.demo.service.LessonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/public/lesson")
@RequiredArgsConstructor
public class PLessonController {
    private final LessonRepository lessonRepository;
    private final LessonService lessonService;

    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject> getById(@PathVariable  int id) {
        var result = lessonService.getById(id);
        return ResponseEntity.status(result.getStatus()).body(result);
    }
}