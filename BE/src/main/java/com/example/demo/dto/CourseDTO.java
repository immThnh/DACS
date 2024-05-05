package com.example.demo.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CourseDTO {
    private String title;
    private int price;
    private int discount;
    private String description;
    private LocalDateTime date;
    private List<Integer> categories;
    private List<SectionDTO> sections;
    @JsonProperty("isEditThumbnail")
    private int isEditedThumbnail;
    private String video;
    private int isEditedCategories;
    private int isEdited;
    private String actionVideo = "NONE";

    public CourseDTO(String temp) {}
}
