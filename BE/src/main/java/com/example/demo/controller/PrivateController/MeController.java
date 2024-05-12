package com.example.demo.controller.PrivateController;


import com.example.demo.auth.AuthService;
import com.example.demo.dto.EnrollDTO;
import com.example.demo.dto.PasswordDTO;
import com.example.demo.dto.ResponseObject;
import com.example.demo.dto.UserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/me")
public class MeController {
    private final AuthService authService;

    @GetMapping("/")
    public String greeting() {


        return "Hello me";
    }
    @GetMapping("/{email}")
    public ResponseEntity<ResponseObject> getUsername(@PathVariable String email) {

        var result = authService.getUserByEmail(email);
        return ResponseEntity.status(result.getStatus()).body(result);
    }

    @PutMapping("/update")
    public ResponseEntity<ResponseObject> updateProfile(@RequestPart(value = "user") UserDTO userDTO, @RequestParam(required = false)MultipartFile avatar) {
        var result = authService.updateProfile(userDTO, avatar);
        return ResponseEntity.status(result.getStatus()).body(result);

    }
    @PutMapping("/update/password")
    public ResponseEntity<ResponseObject> updatePassword(@RequestBody PasswordDTO passwordDTO) {
        var result = authService.updatePassword(passwordDTO);
        return ResponseEntity.status(result.getStatus()).body(result);
    }

    @PostMapping("/enroll/course")
    public ResponseEntity<ResponseObject> enrollCourse(@RequestBody EnrollDTO  enrollDTO) {
        var result = authService.enrollCourse(enrollDTO);
        return ResponseEntity.status(result.getStatus()).body(result);
    }

    @GetMapping("/{alias}/progress/{courseId}")
    public ResponseEntity<ResponseObject> getProgress(@PathVariable String alias, @PathVariable int courseId) {
        var result = authService.getProgressByCourseId(alias, courseId);
        return ResponseEntity.status(result.getStatus()).body(result);
    }
    @PutMapping("/{alias}/progress/{courseId}/updateLessonIds")
    public ResponseEntity<ResponseObject> updateLessonIds(@PathVariable String alias, @PathVariable int courseId
            , @RequestBody List<Integer> lessonIds) {
        var result = authService.updateLessonsIds(alias, courseId, lessonIds);
        return ResponseEntity.status(result.getStatus()).body(result);
    }

}
