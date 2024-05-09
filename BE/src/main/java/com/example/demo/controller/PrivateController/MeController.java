package com.example.demo.controller.PrivateController;


import com.example.demo.auth.AuthService;
import com.example.demo.dto.PasswordDTO;
import com.example.demo.dto.ResponseObject;
import com.example.demo.dto.UserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/me")
public class MeController {
    private final AuthService authService;
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

}
