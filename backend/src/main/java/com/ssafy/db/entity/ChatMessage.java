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
    private String receiver;
    private String lat;
    //내용
    private String lng;
    private String pinTitle;
    private String pinContent;
    private String pinFlag;
    private String pinOrder;
    private String pinColor;
    private String mapSeq;
    private String pinSeq;
    private String sourceOrder;
    private String destinationOrder;

    public ChatMessage(Status status, String sender, String receiver, String lat, String lng, String pinContent, String pinColor, String mapSeq, String pinSeq) {
        this.status = status;
        this.sender = sender;
        this.receiver = receiver;
        this.lat = lat;
        this.lng = lng;
        this.pinContent = pinContent;
        this.pinColor = pinColor;
        this.mapSeq = mapSeq;
        this.pinSeq = pinSeq;
    }
}
