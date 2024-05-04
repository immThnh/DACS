package com.example.demo.repository.data;

import com.example.demo.entity.data.Category;
import com.example.demo.entity.data.Course;
import com.example.demo.entity.data.Section;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course, Integer> {
     Optional<Course> findByTitle(String title);

     Optional<Course> findById(int id);

     Page<Course> findAllByIsDeleted(boolean isDeleted, Pageable pageable);

//    Optional<Course> findByAlias(String alias);
    @Query(value = "select * from course left join course_category on course.id = course_category.course_id where category_id = :id and title like %:title%", nativeQuery = true)
    Optional<List<Course>> findByCategoryIdAndTitle(int id, String title);

    @Query(value = "select * from course left join course_category on course.id = course_category.course_id where category_id = :id and course.isDeleted = 0", nativeQuery = true)
    Page<Course> findByCategoryId(int id, Pageable pageable);
    @Query(value = "select * from course left join course_category on course.id = course_category.course_id where category_id = :id and course.isDeleted = 1", nativeQuery = true)
    Page<Course> findByCategoryIdAndIsDeleted(int id, Pageable pageable);

    Page<Course> findByTitleContaining(String title, Pageable pageable);

    @Query(value = "select * from course", nativeQuery = true)
    Optional<List<Course>> getAll();

    Page<Course> findAll(Pageable pageable);
}
