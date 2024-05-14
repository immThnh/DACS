package com.example.demo.entity.user;

import com.example.demo.entity.data.Course;
import com.example.demo.entity.data.Notification;
import com.example.demo.jwt.Token;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String avatar;
    private String phoneNumber;
    private boolean isDeleted = false;

    @OneToOne
    @JoinColumn(name = "token_id")
    private Token token;

    @ElementCollection
    @CollectionTable(name = "code_table", joinColumns = @JoinColumn(name = "user_id"))
    @MapKeyColumn(name = "code")
    @Column(name = "expiration")
    @ToString.Exclude
    private Map<String, LocalDateTime> code = new HashMap<String, LocalDateTime>();
    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Notification> notifications = new ArrayList<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return role.getAuthorities();
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
