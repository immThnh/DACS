package com.example.demo.controller;

import com.example.demo.auth.*;
import com.example.demo.jwt.JwtService;
import com.example.demo.mail.MailRequest;
import com.example.demo.mail.MailService;
import com.example.demo.twilio.TwilioService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final AuthService authService;
    private final MailService mailService;
    private final TwilioService twilioService;


    @PostMapping("/login")
    public ResponseEntity<String> authenticate(@RequestBody AuthenticationRequest request) {
        String token = authService.authenticate(request);
        if (token != null) {
            return ResponseEntity.ok(token);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Tài khoản hoặc mật khẩu không chính xác!");
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        if (!authService.register(request))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email đã tồn tại!");
        return ResponseEntity.ok("Đăng ký thành công!");
    }

    @PostMapping("/send-verify-email")
    public ResponseEntity<String> sendVerifyEmail(@RequestBody MailRequest email) throws MessagingException {
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
        if(!mailService.sendMailResetPassword(email.getEmail(), code)) {
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
        if(!authService.resetPassword(request))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Lỗi trong thay đổi mật khaẩu!");
        return ResponseEntity.ok("Thay đổi mật khẩu thành công!");
    }

    @PostMapping("/send-verify-otp")
    public ResponseEntity<String> sendOtp(@RequestBody OtpVerifyRequest request) {
        if(!authService.isValidPhoneNumber(request.getPhoneNumber())) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Số điện thoại chưa được đăng kí!");
        if(!authService.sendOtpVerification(request)) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Gửi OTP thất bại!");
        return ResponseEntity.ok("Gửi mã xác nhận thành công!");
    }

}


