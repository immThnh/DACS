package com.example.demo.twilio;

import com.example.demo.auth.AuthService;
import com.example.demo.auth.OtpVerifyRequest;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Data
@RequiredArgsConstructor
public class TwilioService {
    private final Config twilioConfig;

    public boolean senOTPVerify(OtpVerifyRequest request, String code) {
        try {
            PhoneNumber to = new PhoneNumber(request.getPhoneNumber());
            PhoneNumber from = new PhoneNumber(twilioConfig.getPhoneNumber());
            String otpMessage ="Mã xác thực Dream Chasers của bạn là: " + code;
            Message message = Message.creator(to, from, otpMessage).create();
            return true;
        } catch (Exception ex) {
            System.out.println("Lỗi khi gửi OTP");
            System.out.println(ex.getMessage());
            return false;
        }
    }

}

