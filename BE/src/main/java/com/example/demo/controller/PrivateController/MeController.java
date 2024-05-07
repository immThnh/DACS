package com.example.demo.controller.PrivateController;


import com.example.demo.auth.AuthService;
import com.example.demo.dto.ResponseObject;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/me")
public class MeController {
    private final AuthService authService;
    @GetMapping("/{token}")
    public ResponseEntity<ResponseObject> getUsername(@RequestBody String token) {
        var result = authService.getUserByToken(token);
        return ResponseEntity.status(result.getStatus()).body(result);
    }

}
