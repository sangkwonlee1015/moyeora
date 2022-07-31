package com.ssafy.api.controller;

import com.ssafy.api.request.PinRegisterPostReq;
import com.ssafy.api.service.ChatService;
import com.ssafy.api.service.PinService;
import com.ssafy.db.entity.ChatMessage;
import com.ssafy.db.entity.Pin;
import com.ssafy.db.entity.Status;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

import java.util.Map;


@Controller
public class ChatMessageController {
    @Autowired
    private ChatService chatService;

    @Autowired
    private PinService pinService;

    @MessageMapping("/message") // /app/message
//    @SendTo("/chatroom/public")
    private void receivePublicMessage(@Payload ChatMessage message){
        chatService.sendMessage(message);
    }

    @MessageMapping("/private-message")
    public void receivePrivateMessage(@Payload ChatMessage message) {
        PinRegisterPostReq req = new PinRegisterPostReq();
        req.setLat(message.getLatitude());
        req.setLng(message.getLongitude());
        Pin temp = pinService.createPin(req);
        message.setPinSeq(temp.getPinSeq().toString());
        chatService.sendMessagePrivate(message);
    }

}
