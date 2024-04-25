package com.example.demo.service;

import com.example.demo.dto.ResponObject;
import com.example.demo.entity.user.User;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public ResponObject getAllUser() {
        var user = userRepository.findAll();
        if(user == null) {
            return ResponObject.builder().status(HttpStatus.BAD_REQUEST).content("Users is empty").build();
        }

        return ResponObject.builder().status(HttpStatus.OK).content(user).build();
    }
}
