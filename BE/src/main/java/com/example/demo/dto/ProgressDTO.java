package com.example.demo.dto;

import com.example.demo.entity.data.Course;
import lombok.Builder;
import lombok.Data;
import java.util.List;

@Data
@Builder
public class ProgressDTO {
    private Course course;
    private List<Integer> lessonIds;
}
