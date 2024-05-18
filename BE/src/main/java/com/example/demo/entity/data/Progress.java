package com.example.demo.entity.data;

import com.example.demo.entity.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jdk.jshell.spi.ExecutionControl;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Progress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  int id;
    private List<Integer> lessonIds;
    @ManyToOne(cascade = CascadeType.PERSIST)
    private Course course;

    @ManyToOne (cascade = CascadeType.PERSIST)
    @JsonIgnore
    private User user;
}
