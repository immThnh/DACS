package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Data
@Builder
@AllArgsConstructor
public class ResponObject {
    private HttpStatus status;
    private Object content;
}
