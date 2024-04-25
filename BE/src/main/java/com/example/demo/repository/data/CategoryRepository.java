package com.example.demo.repository.data;

import com.example.demo.entity.data.Category;
import com.example.demo.entity.data.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    @Query(value = "select * from category", nativeQuery = true)
    Optional<List<Category>> getAllCategories();

    Optional<Category> findByName(String name);

//    Optional<List<Category>> findByCourses(Course course);
}
