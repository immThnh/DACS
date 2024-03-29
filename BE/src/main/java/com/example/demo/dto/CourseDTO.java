package com.example.demo.dto;

import jakarta.mail.search.SearchTerm;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CourseDTO {
    private String title;
    private String price;
    private String discount;
    private String desc;
    private Set<String> categories;
}
