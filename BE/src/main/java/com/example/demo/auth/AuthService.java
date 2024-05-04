package com.example.demo.auth;

import com.example.demo.dto.ResponseObject;
import com.example.demo.entity.user.Role;
import com.example.demo.entity.user.User;
import com.example.demo.jwt.JwtService;
import com.example.demo.jwt.Token;
import com.example.demo.mail.MailRequest;
import com.example.demo.repository.TokenRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.twilio.TwilioService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    public final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final TwilioService twilioService;

    public boolean register(RegisterRequest request) {
        if(isUsedEmail(request.getEmail())) return  false;
            saveUser(request);
            return true;
    }

    public ResponseObject authenticate(AuthenticationRequest auth) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(auth.getEmail(), auth.getPassword()));
            var user = userRepository.findByEmail(auth.getEmail()).orElse(null);
            if(user == null) {
                return ResponseObject.builder().status(HttpStatus.BAD_REQUEST).content("User is not exist.").build();
            }
            Token token = new Token(jwtService.generateToken(user));
            user.setToken(token);
            return ResponseObject.builder().status(HttpStatus.OK).content(token).build();
        }
        catch (AuthenticationException ex) {
            System.out.println(ex.getMessage() + "Xác thực người dùng thất bại!");
            return null;
        }
    }

    public ResponseObject getAllByPage(int page, int size) {
        var result = userRepository.findAll(PageRequest.of(page, size));
        return ResponseObject.builder().status(HttpStatus.OK).content(result).build();
    }

    public ResponseObject getAllUser() {
        var users = userRepository.findAll();
        return ResponseObject.builder().status(HttpStatus.OK).mess("Get data successfully").status(HttpStatus.OK).content(users).build();
    }

    public ResponseObject getAllRole() {
        return ResponseObject.builder().status(HttpStatus.OK).content(Role.values()).build();
    }

    public ResponseObject getUserByRole(String role, int page, int size) {
        if(Objects.equals(role, "All"))
            return ResponseObject.builder().status(HttpStatus.OK).content(userRepository.findAll(PageRequest.of(page, size))).build();
        return ResponseObject.builder().status(HttpStatus.OK).content(userRepository.findByRole(role, PageRequest.of(page, size))).build();
    }

    public boolean sendOtpVerification(OtpVerifyRequest request) {

        return twilioService.senOTPVerify(request,getVerifyCode());
    }
    private User saveUser(RegisterRequest request) {
        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .role(Role.USER)
                .build();
        return userRepository.save(user);
    }


    public boolean isUsedEmail(String email) {
        var user = userRepository.findByEmail(email).orElse(null);
        System.out.println(user);
        return user != null;
    }

    public boolean isValidPhoneNumber(String phoneNumber) {
        var user = userRepository.findByPhoneNumber(phoneNumber).orElse(null);
        if(user == null) return false;
        return true;
    }
    public String getVerifyCode() {
        SecureRandom random = new SecureRandom();
        StringBuilder code = new StringBuilder();
        String characters = "1234567890";
        for(int i = 0; i < 6; i++) {
            code.append(characters.charAt(random.nextInt(characters.length())));
        }
        return code.toString();
    }

    public boolean isValidCode(MailRequest request) {
        User user = findUserByEmail(request.getEmail());
        if(user == null || user.getCode().isEmpty()) return false;
            return user.getCode().get(request.getCode()).isAfter(LocalDateTime.now());
    }

    public boolean resetPassword(ResetPasswordRequest request) {
        var user = findUserByEmail(request.getEmail());
        if(user == null) return false;
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(user);
        return true;
    }

    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    public boolean saveCode(MailRequest request, String code) {
        User user = userRepository.findByEmail(request.getEmail()).orElse(null);
        if(user == null) return false;
        Map<String, LocalDateTime> token = new HashMap<String, LocalDateTime>();
        token.put(code, LocalDateTime.now().plus(48, ChronoUnit.HOURS));
        user.setCode(token);
        userRepository.save(user);
        return true;
    }
    public boolean saveCode(OtpVerifyRequest request, String code) {
        User user = userRepository.findByPhoneNumber(request.getPhoneNumber()).orElse(null);
        if(user == null) return false;
        Map<String, LocalDateTime> token = new HashMap<String, LocalDateTime>();
        token.put(code, LocalDateTime.now().plus(48, ChronoUnit.HOURS));
        user.setCode(token);
        userRepository.save(user);
        return true;
    }
}
