package com.example.demo;

import com.example.demo.auth.AuthService;
import com.example.demo.entity.user.Role;
import com.example.demo.entity.user.User;
import com.example.demo.jwt.JwtService;
import com.example.demo.repository.UserRepository;
import com.example.demo.twilio.Config;
import com.twilio.Twilio;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.Async;

import java.util.Arrays;
import java.util.List;

@SpringBootApplication
@RequiredArgsConstructor
public class DemoApplication {
	private final Config configTwilio;
	private final UserRepository userRepository;
	private final JwtService jwtService;

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

//	@Bean
//	CommandLineRunner commandLineRunner (AuthService authService) {
//		return args -> {
//			User user = User.builder()
//					.firstName("nguyen")
//					.lastName("user")
//					.email("user@example.com")
//					.password("1234")
//					.role(Role.USER)
//					.build();
//			System.out.println(jwtService.generateToken(user));
//			User admin = User.builder()
//					.firstName("nguyen")
//					.lastName("admin")
//					.email("admin@example.com")
//					.password("1234")
//					.role(Role.ADMIN)
//					.build();
//			System.out.println(jwtService.generateToken(admin));
//
//			User manager = User.builder()
//					.firstName("nguyen")
//					.lastName("manager")
//					.email("managern@example.com")
//					.password("1234")
//					.role(Role.MANAGER)
//					.build();
//			System.out.println(jwtService.generateToken(manager));
//
//			userRepository.saveAll(List.of(user, admin, manager));
//		};
//	}
}
