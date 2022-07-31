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
    private String latitude;
    //내용
    private String longitude;
    private String receiver;
    private String pinSeq;

    public ChatMessage(Status status, String longitude, String latitude, String receiver, String sender, String pinSeq){
        this.status = status;
        this.longitude = longitude;
        this.latitude = latitude;
        this.receiver = receiver;
        this.sender = sender;
        this.pinSeq = pinSeq;
    }
}
