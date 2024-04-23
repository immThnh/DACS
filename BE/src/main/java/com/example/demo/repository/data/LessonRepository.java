package com.example.demo.repository.data;

import com.example.demo.entity.data.Course;
import com.example.demo.entity.data.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, Integer> {
//    @Query(value = "select * from lesson join  where course_id  = :courseId", nativeQuery = true)
}
