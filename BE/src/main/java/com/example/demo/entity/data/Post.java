package com.example.demo.entity.data;


import com.example.demo.entity.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String content;
    private LocalDateTime date ;
    private String title;
    private  String thumbnail;
    private boolean isDeleted = false;

    @ManyToOne
    private User user;

    @OneToMany()
    private List<Tag> tags;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Comment> comment;
}
