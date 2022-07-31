package com.ssafy.api.service;

import com.ssafy.db.entity.ChatMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class ChatService {
    @Autowired
    private SimpMessagingTemplate template;

    public void sendMessage(ChatMessage message){
        this.template.convertAndSend("/chatroom/public", message);
    }
    public void sendMessagePrivate(ChatMessage message) {
        this.template.convertAndSendToUser(message.getReceiver(), "/private", message);
    }
}
