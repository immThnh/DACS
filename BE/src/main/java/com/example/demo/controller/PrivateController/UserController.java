package com.example.demo.controller.PrivateController;

import com.example.demo.auth.*;
import com.example.demo.dto.PasswordDTO;
import com.example.demo.dto.ResponseObject;
import com.example.demo.mail.MailRequest;
import com.example.demo.mail.MailService;
import com.example.demo.service.UserService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/private/user")
public class UserController {
    private final AuthService authService;
    private final MailService mailService;
    private final UserService userService;

    @PutMapping("/resetPassword/{email}")
    public ResponseEntity<ResponseObject> resetPassword(@RequestBody PasswordDTO passwordDTO, @RequestParam String email) {
        var result = authService.adminUpdatePasswordForUser(passwordDTO, email);
        return ResponseEntity.status(result.getStatus()).body(result);
    }

    @GetMapping("")
    public ResponseEntity<ResponseObject> greeting() {
        var res = ResponseObject.builder().status(HttpStatus.OK).mess("Welcome to admin dashboard").build();
        return ResponseEntity.status(res.getStatus()).body(res);
    }

    @GetMapping("/getAll")
    public ResponseEntity<ResponseObject> getAllUsersByPage(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "5") int size) {
        var result = userService.getAllByPage(page, size);
        return ResponseEntity.status(result.getStatus()).body(result);
    }

    @GetMapping("/getAllDeleted")
    public ResponseEntity<ResponseObject> getAllDeleted(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "5") int size) {
        var result = userService.getAllDeletedByPage(page, size);
        return ResponseEntity.status(result.getStatus()).body(result);
    }

    @GetMapping("/getAllUserAndRole")
    public ResponseEntity<ResponseObject> getAllRole(@RequestParam(defaultValue = "false") boolean isDeleted) {
        var result = userService.getAllUserAndRole(isDeleted);
        return ResponseEntity.status(result.getStatus()).body(result);
    }

    @GetMapping("/filter")
    public ResponseEntity<ResponseObject> getUserByRole(@RequestParam(value = "role") String role,
                                                        @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "5") int size) {
        var result = userService.getUserByRole(role, page, size);
        return ResponseEntity.status(result.getStatus()).body(result);
    }

    @GetMapping("/search")
    public ResponseEntity<ResponseObject> getUserByName(@RequestParam(value = "name") String name, @RequestParam(defaultValue = "false") boolean isDeleted,
                                                        @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "5") int size) {
        var result = userService.getUserByName(name, isDeleted, page, size);
        return ResponseEntity.status(result.getStatus()).body(result);
    }

    @PostMapping("/login")
    public ResponseEntity<ResponseObject> authenticate(@RequestBody AuthenticationRequest request) {
        var res = authService.authenticate(request);
        return ResponseEntity.status(res.getStatus()).body(res);
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        if (!authService.register(request))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email đã tồn tại!");
        return ResponseEntity.ok("Đăng ký thành công!");
    }

    @PostMapping("/send-verify-email")
    public ResponseEntity<String> sendVerifyEmail(@RequestBody MailRequest email) {
        if (authService.isUsedEmail(email.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email đã tồn tại!"); // 400
        }
        String code = authService.getVerifyCode();
        if (mailService.sendCode(email.getEmail(), code)) {
            return ResponseEntity.ok(code);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Gửi không thành công!");
    }

    @PostMapping("/send-reset-password-email")
    public ResponseEntity<String> sendResetPasswordEmail(@RequestBody MailRequest email) throws MessagingException {
        if (!authService.isUsedEmail(email.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email không tồn tài!");
        }
        String code = authService.getVerifyCode();
        if (!mailService.sendMailResetPassword(email.getEmail(), code)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Gửi mail thất bại!");
        }
        authService.saveCode(email, code);
        return ResponseEntity.ok(code);
    }

    @PostMapping("/verify-reset-password-code")
    public ResponseEntity<String> verifyResetPassCode(@RequestBody MailRequest request) {
        if (authService.isValidCode(request)) return ResponseEntity.ok("Mã xác thực đúng");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Mã xác thực sai!");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest request) {
        if (!authService.resetPassword(request))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Lỗi trong thay đổi mật khaẩu!");
        return ResponseEntity.ok("Thay đổi mật khẩu thành công!");
    }

//    @PostMapping("/send-verify-otp")
//    public ResponseEntity<String> sendOtp(@RequestBody OtpVerifyRequest request) {
//        if(!authService.isValidPhoneNumber(request.getPhoneNumber())) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Số điện thoại chưa được đăng kí!");
//        if(!authService.sendOtpVerification(request)) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Gửi OTP thất bại!");
//        return ResponseEntity.ok("Gửi mã xác nhận thành công!");
//    }

    @PutMapping("/delete/soft/{id}")
    public ResponseEntity<ResponseObject> softDelete(@PathVariable int id) {
        var result = userService.softDelete(id);
        return ResponseEntity.status(result.getStatus()).body(result);
    }

    @DeleteMapping("/delete/hard/{id}")
    public ResponseEntity<ResponseObject> hardDelete(@PathVariable int id) {
        var result = userService.hardDelete(id);
        return ResponseEntity.status(result.getStatus()).body(result);
    }

    @PutMapping("/restore/{id}")
    public ResponseEntity<ResponseObject> restoreUser(@PathVariable int id) {
        var result = userService.restoreUserById(id);
        return ResponseEntity.status(result.getStatus()).body(result);
    }


}

