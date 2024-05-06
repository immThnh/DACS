package com.example.demo.jwt;

import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.EOFException;
import java.io.IOException;
import java.nio.file.AccessDeniedException;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException {

       try {
           System.out.println("jwtFilter");
           if(request.getServletPath().contains("/api/v1/public")) {
               filterChain.doFilter(request, response);
               return;
           }
           String authHeader = request.getHeader("Authorization");
           String jwt;
           String email;
           if(authHeader == null || !authHeader.startsWith("Bearer ")) {
               filterChain.doFilter(request, response);
               return;
           }
           jwt = authHeader.substring(7);
           email = jwtService.extractUserName(jwt);
           if(email != null || SecurityContextHolder.getContext().getAuthentication() == null) {
               UserDetails userDetails = userDetailsService.loadUserByUsername(email);
               if(jwtService.isValidToken(jwt, userDetails)) {
                   UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                   System.out.println("Role: " + userDetails.getAuthorities());
                   usernamePasswordAuthenticationToken.setDetails(
                           new WebAuthenticationDetailsSource().buildDetails(request)
                   );
                   SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
               }
           }
           filterChain.doFilter(request, response);
       }
       catch (Exception e) {
           logger.error("Exception occurred during JWT filter processing: " + e.getMessage(), e);
           response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
           response.getWriter().write("Session is expired");
           response.sendRedirect("http://localhost:3000/login");
       }
    }
}
