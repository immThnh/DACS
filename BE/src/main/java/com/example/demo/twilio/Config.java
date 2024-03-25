package com.example.demo.twilio;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Configuration
@Component
@Data
public class Config {
    @Value("${twilio.AccountSId}")
    private String accountsId;
    @Value("${twilio.AuthToken}")
    private String authToken;
    @Value("${twilio.phoneNumber}")
    private String phoneNumber;

}
