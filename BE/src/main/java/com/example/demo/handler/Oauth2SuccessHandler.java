package com.example.demo.handler;

import com.example.demo.auth.AuthService;
import com.example.demo.entity.user.Role;
import com.example.demo.entity.user.User;
import com.example.demo.repository.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Data;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Data
@Component
public class Oauth2SuccessHandler implements AuthenticationSuccessHandler {
    private final UserRepository userRepository;
    private final AuthService authService;
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
        System.out.println(oauth2User.getAttributes());
        String family_name = oauth2User.getAttribute("name");
        String email = oauth2User.getAttribute("email");
        var user = authService.findUserByEmail(email);
        if(user == null) {
            user = User.builder()
                    .email(email)
                    .lastName(family_name)
                    .role(Role.USER)
                    .build();
            userRepository.save(user);
        }
        response.sendRedirect("http://localhost:3000");
    }
}
