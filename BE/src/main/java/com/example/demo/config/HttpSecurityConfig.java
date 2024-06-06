package com.example.demo.config;

import com.example.demo.dto.ResponseObject;
import com.example.demo.entity.user.Role;
import static com.example.demo.entity.user.Permission.*;
import com.example.demo.handler.LogoutHandler;
import com.example.demo.handler.Oauth2SuccessHandler;
import com.example.demo.jwt.JwtFilter;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
public class HttpSecurityConfig {

    private final JwtFilter jwtFilter;
    private final Oauth2SuccessHandler oauth2SuccessHandler;
    private final LogoutHandler logoutHandler;
    private final RestAuthenticationEntryPoint restAuthenticationEntryPoint;

    @Autowired
    public HttpSecurityConfig (JwtFilter jwtFilter, Oauth2SuccessHandler oauth2SuccessHandler, LogoutHandler logoutHandler, RestAuthenticationEntryPoint restAuthenticationEntryPoint) {
        this.jwtFilter = jwtFilter;
        this.oauth2SuccessHandler = oauth2SuccessHandler;
        this.logoutHandler = logoutHandler;
        this.restAuthenticationEntryPoint = restAuthenticationEntryPoint;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                 .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/api/v1/public/**", "/oauth2/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/private/**").hasAnyAuthority(ADMIN_READ.name(), MANAGER_READ.name())
                        .requestMatchers(HttpMethod.POST, "/api/v1/private/**").hasAnyAuthority(ADMIN_CREATE.name(), MANAGER_CREATE.name())
                        .requestMatchers(HttpMethod.PUT, "/api/v1/private/**").hasAnyAuthority(ADMIN_UPDATE.name(), MANAGER_UPDATE.name())
                        .requestMatchers(HttpMethod.DELETE, "/api/v1/private/**").hasAuthority(ADMIN_DELETE.name())
                        .anyRequest()
                        .permitAll()
                )
                .oauth2Login(o -> o.successHandler(oauth2SuccessHandler))
                .logout(logout -> logout.logoutUrl("/api/v1/me/logout")
                        .addLogoutHandler(logoutHandler)
                        .logoutSuccessHandler(((request, response, authentication) -> {
                            SecurityContextHolder.clearContext();
                            response.setStatus(HttpServletResponse.SC_OK);
                        }))
                )
                .exceptionHandling(exception -> exception.authenticationEntryPoint(restAuthenticationEntryPoint))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
}
