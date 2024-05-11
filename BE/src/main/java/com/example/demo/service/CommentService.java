package com.example.demo.service;

import com.example.demo.dto.CommentDTO;
import com.example.demo.dto.ResponseObject;
import com.example.demo.entity.data.Comment;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.data.CommentRepository;
import com.example.demo.repository.data.LessonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional
public class CommentService {
    private final UserRepository userRepository;
    private  final CommentRepository commentRepository;
    private  final LessonRepository lessonRepository;

    public CommentDTO saveComment(CommentDTO commentDTO) {
        var user = userRepository.findByEmail(commentDTO.getEmail()).orElse(null);
        var lesson = lessonRepository.findById(commentDTO.getLessonId()).orElse(null);
        if (user == null || lesson == null) {
            System.out.println("user || lesson not found");
        }
        Comment comment = Comment.builder()
                .userEmail(commentDTO.getEmail())
                .userName(commentDTO.getUserName())
                .user(user)
                .content(commentDTO.getContent())
                .lesson(lesson)
                .date(LocalDateTime.now())
                .build();
        commentRepository.save(comment);
        return commentDTO;
    }

    public ResponseObject getCommentByLessonId(int lessonId) {
        var comments = commentRepository.findAllByLessonId(lessonId, PageRequest.of(0, Integer.MAX_VALUE));
        return ResponseObject.builder().status(HttpStatus.OK).content(comments).build();
    }
}
