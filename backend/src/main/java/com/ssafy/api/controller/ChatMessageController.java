package com.ssafy.api.controller;

import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.api.request.PinRegisterPostReq;
import com.ssafy.api.request.PinUpdatePatchReq;
import com.ssafy.api.service.ChatService;
import com.ssafy.api.service.PinService;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.JwtAuthenticationFilter;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.common.util.JwtTokenUtil;
import com.ssafy.db.entity.ChatMessage;
import com.ssafy.db.entity.Pin;
import com.ssafy.db.entity.Status;
import com.ssafy.db.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.TextMessage;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;


@Controller
public class ChatMessageController {
    @Autowired
    private ChatService chatService;

    @Autowired
    private PinService pinService;

    @Autowired
    private UserService userService;

    @MessageMapping("/message") // /app/message
//    @SendTo("/chatroom/public")
    private void receivePublicMessage(@Payload ChatMessage message){
        chatService.sendMessage(message);
    }

    @MessageMapping("/private-message")
    public void receivePrivateMessage(@Payload ChatMessage message, StompHeaderAccessor accessor) {
        // 유저 인증
        String token = accessor.getNativeHeader("Authorization").get(0);
        if(token == null)
            return;
        JWTVerifier verifier = JwtTokenUtil.getVerifier();
        JwtTokenUtil.handleError(token);
        DecodedJWT decodedJWT = verifier.verify(token.replace(JwtTokenUtil.TOKEN_PREFIX, ""));
        String userId = decodedJWT.getSubject();
        if (userId == null)
            return;
        User user = userService.getUserByUserId(userId);
        if(user == null)
            return;

        // 메시지 처리
        System.out.println(message);
        switch (message.getStatus()) {
            case ADDPIN:
                PinRegisterPostReq pinRegisterPostReq = new PinRegisterPostReq();
                pinRegisterPostReq.setPinLat(message.getLat());
                pinRegisterPostReq.setPinLng(message.getLng());
                pinRegisterPostReq.setPinTitle(message.getPinTitle());
                pinRegisterPostReq.setPinColor(message.getPinColor());
                pinRegisterPostReq.setMapSeq(Long.parseLong(message.getMapSeq()));
                Pin pin = pinService.registerPin(pinRegisterPostReq, user.getUserSeq());
                message.setPinSeq(pin.getPinSeq().toString());
                message.setPinOrder(pin.getPinOrder().toString());
                chatService.sendMessagePrivate(message);
                break;
            case MODPIN:
                PinUpdatePatchReq pinUpdatePatchReq = new PinUpdatePatchReq();
                pinUpdatePatchReq.setPinSeq(Long.parseLong(message.getPinSeq()));
                pinUpdatePatchReq.setPinColor(message.getPinColor());
                pinUpdatePatchReq.setPinContent(message.getPinContent());
                pinService.updatePin(pinUpdatePatchReq);
                chatService.sendMessagePrivate(message);
                break;
        }
    }

}
