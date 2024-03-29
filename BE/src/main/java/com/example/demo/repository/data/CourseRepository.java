package com.example.demo.repository.data;

import com.example.demo.entity.data.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course, Integer> {
    public Optional<Course> findByTitle(String title);
}
