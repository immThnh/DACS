package com.example.demo.entity.data;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Lesson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String video;
    private String title;
    @ManyToOne
    @JoinColumn(name="course_id")
    @JsonIgnore
    private Course course;

    @OneToMany
    private List<Excercise> excercise = new ArrayList<>();
}
