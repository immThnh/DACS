package com.example.demo.repository;

import com.example.demo.entity.auth.User;
import com.example.demo.jwt.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TokenRepository extends JpaRepository<Token, Integer> {
}
