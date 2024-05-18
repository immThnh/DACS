package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@AllArgsConstructor
@Data
public class UserStatisticDTO {
    private int id;
    private String email;
    private String firstName;
    private String lastName;
    private String avatar;
}
