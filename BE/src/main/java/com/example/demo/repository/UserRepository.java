package com.example.demo.repository;

import com.example.demo.entity.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
    Optional<User> findByPhoneNumber(String phoneNumber);

    @Query(value = "select * from user where role = :role", nativeQuery = true)
    Page<User> findByRole(String role, Pageable pageable);
    Page<User> findByFirstNameContainingOrLastNameContaining(String firstName, String lastName, Pageable pageable);

    Page<User> findAllByIsDeleted(boolean isDeleted, Pageable pageable);
}
