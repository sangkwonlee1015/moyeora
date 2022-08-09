package com.ssafy.api.controller;

import com.ssafy.api.request.PinRegisterPostReq;
import com.ssafy.api.request.PinUpdatePatchReq;
import com.ssafy.api.service.ChatService;
import com.ssafy.api.service.PinService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.ChatMessage;
import com.ssafy.db.entity.Pin;
import com.ssafy.db.entity.Status;
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
        switch (message.getStatus()){
            case ADDPIN:
                PinRegisterPostReq pinRegisterPostReq = new PinRegisterPostReq();
                pinRegisterPostReq.setPinLat(message.getLat());
                pinRegisterPostReq.setPinLng(message.getLng());
                pinRegisterPostReq.setPinContent(message.getPinContent());
                pinRegisterPostReq.setPinColor(message.getPinColor());
//                pinRegisterPostReq.setMapSeq(Long.parseLong(message.getMapSeq()));
//                Long userSeq = ((SsafyUserDetails) authentication.getDetails()).getUser().getUserSeq();
//                Pin pin = pinService.registerPin(pinRegisterPostReq, userSeq);
//                message.setPinSeq(pin.getPinSeq().toString());
                message.setPinSeq(Integer.toString((int)(Math.random()*1000)));
                chatService.sendMessagePrivate(message);
                break;
            case MODPIN:
                PinUpdatePatchReq pinUpdatePatchReq = new PinUpdatePatchReq();
                pinUpdatePatchReq.setPinSeq(Long.parseLong(message.getPinSeq()));
                pinUpdatePatchReq.setPinColor(message.getPinColor());
                pinUpdatePatchReq.setPinContent(message.getPinContent());
//                pinService.updatePin(pinUpdatePatchReq);
                chatService.sendMessagePrivate(message);
                break;

        }
    }

}
