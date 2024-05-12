package com.example.demo.repository.data;

import com.example.demo.dto.CommentDTO;
import com.example.demo.entity.data.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {

    @Query(value = "SELECT * FROM comment WHERE lesson_id = :lessonId ORDER BY date DESC", nativeQuery = true)
    Page<Comment> findAllByLessonId(int lessonId, Pageable pageable);
}
