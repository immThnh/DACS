package com.example.demo.request;

import com.example.demo.entity.data.Lesson;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CourseRequest {
    private String title;
    private int price;
    private int discount;
    private String description;
    private LocalDateTime date;
    private List<Integer> categories;
    private List<Lesson> sections;
    private int isEditedThumbnail;
    private int isEditedCategories;

    public CourseRequest(String temp) {}
}
