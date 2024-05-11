package com.example.demo.dto;

import lombok.Builder;
import lombok.Data;
import org.springframework.context.annotation.Bean;

@Data
@Builder
public class CommentDTO {

    private String email;
    private String userName;
    private String content;
    private int lessonId;
    private String sendToEmail;
    private boolean sub;
}
