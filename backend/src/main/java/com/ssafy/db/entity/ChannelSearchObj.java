package com.ssafy.db.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChannelSearchObj {
    private Channel channel;
    private int participantsCount;
    private byte[] uploadedImage;
    private String userNick;
}
