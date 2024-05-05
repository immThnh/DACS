package com.example.demo.service;

import com.example.demo.dto.ResponseObject;
import com.example.demo.entity.user.Role;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

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
    public ResponseObject getUserByName(String name, int page, int size) {
        if(Objects.equals(name, ""))
            return ResponseObject.builder().status(HttpStatus.OK).content(userRepository.findAll(PageRequest.of(page, size))).build();
        return ResponseObject.builder().status(HttpStatus.OK).content(userRepository.findByFirstNameContainingOrLastNameContaining(name, name, PageRequest.of(page, size))).build();
    }
    public ResponseObject getAllByPage(int page, int size) {
        var result = userRepository.findAllByIsDeleted(false ,PageRequest.of(page, size));
        return ResponseObject.builder().status(HttpStatus.OK).content(result).build();
    }public ResponseObject getAllDeletedByPage(int page, int size) {
        var result = userRepository.findAllByIsDeleted(true ,PageRequest.of(page, size));
        return ResponseObject.builder().status(HttpStatus.OK).content(result).build();
    }

    public ResponseObject softDelete(int id) {
        var user = userRepository.findById(id).orElse(null);
        if (user == null) {
            return ResponseObject.builder().status(HttpStatus.BAD_REQUEST).mess("Course is not exist!").build();
        }
        user.setDeleted(true);
        userRepository.save(user);
        return ResponseObject.builder().mess("Delete course successfully!").status(HttpStatus.OK).build();
    }

    public ResponseObject hardDelete(int id) {
        var user = userRepository.findById(id).orElse(null);
        if (user == null) {
            return ResponseObject.builder().status(HttpStatus.BAD_REQUEST).mess("Course is not exist!").build();
        }
        userRepository.delete(user);
        return ResponseObject.builder().mess("Delete course successfully!").status(HttpStatus.OK).build();
    }

    public ResponseObject restoreUserById(int id) {
        var user = userRepository.findById(id).orElse(null);
        if(user == null) return ResponseObject.builder().mess("Course does not exist").status(HttpStatus.BAD_REQUEST).build();
        user.setDeleted(false);
        userRepository.save(user);
        return ResponseObject.builder().mess("Restore successfully").status(HttpStatus.OK).build();
    }
}
