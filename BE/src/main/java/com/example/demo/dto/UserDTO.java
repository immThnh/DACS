package com.example.demo.dto;

import com.example.demo.entity.data.Progress;
import com.example.demo.entity.user.Role;
import jakarta.persistence.Entity;
import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@NoArgsConstructor
public class UserDTO {
    private final String email;
    private String password;
    private final String firstName;
    private final String lastName;
    private final String avatar;
    private String phoneNumber;
    private String token;
    private List<Progress> progresses;
    private Role role;

    public void setAvatar(String avatar) {
    }
}
