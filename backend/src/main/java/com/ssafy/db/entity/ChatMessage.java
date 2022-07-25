package com.ssafy.db.entity;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class ChatMessage {

    private Status status;
    //보내는 사람
    private String sender;
    //내용
    private String msg;

    public ChatMessage(Status status, String sender, String msg){
        this.status = status;
        this.sender = sender;
        this.msg = msg;
    }
}
