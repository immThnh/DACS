package com.example.demo.entity.data;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Lesson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String description;
    private String linkVideo;
    private String title;
    private String video;
    private LocalDateTime date;

    @ManyToOne
    @JoinColumn(name="course_id")
    @JsonIgnore
    private Course course ;

    public Course getCourse() {
        return course;
    }

    @OneToMany(mappedBy = "lesson", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Exercise> exercises = new ArrayList<>();
}
