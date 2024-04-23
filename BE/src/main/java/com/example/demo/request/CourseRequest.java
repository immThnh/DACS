package com.example.demo.data;

import com.example.demo.entity.data.Lesson;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

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
    private String desc;
    private LocalDateTime date;
    List<Lesson> lesson;
    private Set<String> categories;
//    private MultipartFile thumbnail;
    private List<Lesson> lessons;

    private boolean isEditedThumbnail;
    private boolean isEditedCategories;
}
