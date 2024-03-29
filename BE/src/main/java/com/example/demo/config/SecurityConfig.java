package com.example.demo.config;

import com.example.demo.entity.auth.Permission;
import com.example.demo.entity.auth.Role;
import com.example.demo.handler.LogoutHandler;
import com.example.demo.handler.Oauth2SuccessHandler;
import com.example.demo.jwt.JwtFilter;
import jakarta.persistence.AssociationOverride;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

import static com.example.demo.entity.auth.Permission.*;
import static com.example.demo.entity.auth.Role.ADMIN;
import static com.example.demo.entity.auth.Role.MANAGER;
import static org.springframework.http.HttpMethod.*;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final AuthenticationProvider authenticationProvider;
    private final JwtFilter jwtFilter;
    private final Oauth2SuccessHandler oauth2SuccessHandler;
    private final LogoutHandler logoutHandler;
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity.cors(cors -> cors.disable())
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/v1/auth/**",
//                                "/api/v1/data/**",
                                "/home",
                                "/api/v1/auth/send-verify-otp",
                                "/images/**"
                        ).permitAll()
//                        .requestMatchers("/api/v1/management/**").hasAnyRole(ADMIN.name(), MANAGER.name()) // cấu hình cho cả CRUD
                        // cấu hình chi tiết permission
                        .requestMatchers(GET, "/api/v1/data/**").hasAnyAuthority(ADMIN_READ.name(), MANAGER_READ.name())
                        .requestMatchers(POST, "/api/v1/data/**").hasAnyAuthority(ADMIN_CREATE.name(), MANAGER_CREATE.name())
                        .requestMatchers(PUT, "/api/v1/data/**").hasAnyAuthority(ADMIN_UPDATE.name(), MANAGER_UPDATE.name())
                        .requestMatchers(DELETE, "/api/v1/data/**").hasAuthority(ADMIN_DELETE.name())
                        .anyRequest()
                        .authenticated()
                )
                .oauth2Login(o -> o
                        .successHandler(oauth2SuccessHandler))
                .logout(logout -> logout.logoutUrl("/api/v1/auth/logout")
                        .addLogoutHandler(logoutHandler)
                        .logoutSuccessHandler(((request, response, authentication) -> {
                            SecurityContextHolder.clearContext();
                            System.out.println("Logout successful");
                            response.setStatus(HttpServletResponse.SC_OK);
                        }))
                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
}
