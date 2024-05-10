package com.example.demo.controller.PublicController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class CommentController {

        @MessageMapping("/comment//lesson/{lessonId}")
        @SendTo("/comment/lesson/{lessonId}")
        public String handleComment(@Payload String mess, @DestinationVariable int lessonId) throws Exception {
            System.out.println("lId: " + lessonId);
            return mess;
        }

}
