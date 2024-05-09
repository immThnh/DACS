package com.example.demo.repository.data;

import com.example.demo.entity.data.Progress;
import com.example.demo.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProgressRepository extends JpaRepository<Progress, Integer> {
    Optional<Progress> findByCourseIdAndUser(int courseId, User user);
}
