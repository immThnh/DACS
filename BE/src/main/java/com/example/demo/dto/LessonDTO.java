package com.example.demo.dto;

import com.example.demo.entity.data.Exercise;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

// NONE, REMOVE, UPDATE, HAS

@Data
@NoArgsConstructor
public class LessonDTO {
    private int id;
    private String linkVideo;
    private String title;
    private String description;
    private LocalDateTime date;
    private String video;
    private List<Exercise> exercies;
    private boolean isEdited;
    private String actionVideo = "NONE";
    public LessonDTO(String value){}
}