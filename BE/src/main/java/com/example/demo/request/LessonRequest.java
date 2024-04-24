package com.example.demo.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Data

@NoArgsConstructor
//@AllArgsConstructor
public class LessonRequest {
    private int id;
    private String linkVideo;
    private String title;
    private String description;
    private LocalDateTime date;
    private boolean isEdited;
    private int isEditedVideo = 0;
    public LessonRequest(String value){}
}