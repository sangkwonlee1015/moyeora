package com.ssafy.api.controller;

import com.ssafy.api.request.PinRegisterPostReq;
import com.ssafy.api.service.ChatService;
import com.ssafy.api.service.PinService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.ChatMessage;
import com.ssafy.db.entity.Pin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import springfox.documentation.annotations.ApiIgnore;


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
    public void receivePrivateMessage(@ApiIgnore Authentication authentication, @Payload ChatMessage message) {
        // 로그인 구현 후 테스트
//        if (authentication == null) {
//            return ;
//        }
        PinRegisterPostReq req = new PinRegisterPostReq();
        req.setPinLat(message.getLatitude());
        req.setPinLng(message.getLongitude());
//        Pin pin = pinService.registerPin(req, );
        chatService.sendMessagePrivate(message);
    }

}
