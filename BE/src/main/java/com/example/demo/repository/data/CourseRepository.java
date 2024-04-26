package com.example.demo.repository.data;

import com.example.demo.entity.data.Category;
import com.example.demo.entity.data.Course;
import com.example.demo.entity.data.Section;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course, Integer> {
     Optional<Course> findByTitle(String title);

     Optional<Course> findById(int id);

//    Optional<Course> findByAlias(String alias);
    @Query(value = "select * from course left join course_category on course.id = course_category.course_id where category_id = :id and title like %:title%", nativeQuery = true)
    Optional<List<Course>> findByCategoryIdAndTitle(int id, String title);

    @Query(value = "select * from course left join course_category on course.id = course_category.course_id where category_id = :id", nativeQuery = true)
    Optional<List<Course>> findByCategoryId(int id);

    Optional<List<Course>> findByTitleContaining(String title);

    @Query(value = "select * from course", nativeQuery = true)
    Optional<List<Course>> getAll();
}
