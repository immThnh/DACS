package com.example.demo.dto;

import com.example.demo.entity.data.Progress;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder

@AllArgsConstructor
@RequiredArgsConstructor
public class CourseDTO {
//    private String title;
//    private int price;
//    private String thumbnail;
//    private int discount;
//    private String description;
//    private LocalDateTime date;
//    private List<Integer> categories;
//    private List<SectionDTO> sections;
//    @JsonProperty("isEditThumbnail")
//    private int isEditedThumbnail;
//    private String video;
//    private int isEditedCategories;
//    private int isEdited;
//    private String actionVideo = "NONE";
//    private Progress progress;
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
    private Progress progress;


//    public CourseDTO(String title, int price, String thumbnail) {
//        this.title = title;
//        this.price = price;
//        this.thumbnail = thumbnail;
//    }
}
