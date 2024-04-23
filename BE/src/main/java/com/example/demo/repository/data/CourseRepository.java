package com.example.demo.repository.data;

import com.example.demo.entity.data.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course, Integer> {
     Optional<Course> findByTitle(String title);

     Optional<Course> findById(int id);

    Optional<Course> findByAlias(String alias);

    @Query(value = "select * from course", nativeQuery = true)
    Optional<List<Course>> getAll();
}
