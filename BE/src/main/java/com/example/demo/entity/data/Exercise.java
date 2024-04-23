package com.example.demo.entity.data;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Exercise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String question;
    @ElementCollection
    @CollectionTable(name = "question_table", joinColumns = @JoinColumn(name = "exercise_id") )
    @MapKeyColumn(name = "question")
    @Column(name = "isTrue")
    private Map<String, Boolean> answers;

    @ManyToOne
    private Lesson lesson;
}
