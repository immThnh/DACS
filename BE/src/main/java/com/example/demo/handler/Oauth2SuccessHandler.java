package com.example.demo.handler;

import com.example.demo.auth.AuthService;
import com.example.demo.cloudinary.CloudService;
import com.example.demo.dto.ResponseObject;
import com.example.demo.entity.user.Role;
import com.example.demo.entity.user.User;
import com.example.demo.jwt.JwtService;
import com.example.demo.jwt.Token;
import com.example.demo.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Data
@Component
public class Oauth2SuccessHandler implements AuthenticationSuccessHandler {
    private final UserRepository userRepository;
    private final CloudService cloudService;
    private final AuthService authService;
    private final JwtService jwtService;
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
        System.out.println(oauth2User.getAttribute("picture").toString());
        String family_name = oauth2User.getAttribute("name");
        String email = oauth2User.getAttribute("email");
        var user = authService.findUserByEmail(email);
        if(user == null) {
            user = User.builder()
                    .email(email)
                    .lastName(family_name)
                    .role(Role.USER)
                    .avatar(oauth2User.getAttribute("picture"))
                    .build();
            userRepository.save(user);
        }

        Token token = new Token(jwtService.generateToken(user));
        user.setToken(token);
        var userDTO = authService.getUserDTOFromUser(user);
        userDTO.setToken(token.getToken());

        ObjectMapper objectMapper = new ObjectMapper();
        response.setContentType("application/json");
        var res = ResponseObject.builder().mess("Login successful").status(HttpStatus.OK).content(userDTO).build();
        String userJson = objectMapper.writeValueAsString(res);
        System.out.println("userJson: " + userJson);
        response.getWriter().write(userJson);
        response.sendRedirect("http://localhost:3000");
    }
}
