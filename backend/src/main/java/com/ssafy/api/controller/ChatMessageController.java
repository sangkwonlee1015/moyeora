package com.ssafy.api.controller;

import com.ssafy.api.service.ChatService;
import com.ssafy.db.entity.ChatMessage;
import com.ssafy.db.entity.Status;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.Map;


@Controller
public class ChatMessageController {
    @Autowired
    private ChatService chatService;

    @MessageMapping("/message") // /app/message
//    @SendTo("/chatroom/public")
    private void receivePublicMessage(@Payload ChatMessage message){
        chatService.sendMessage(message);
    }

//    @MessageMapping("/private-message")
//    public ChatMessage receivePrivateMessage(@Payload ChatMessage message) {
//        simpMessagingTemplate.convertAndSendToUser(message.getReceiver(), "/private", message); // /user/David/private
//        return message;
//    }

}
