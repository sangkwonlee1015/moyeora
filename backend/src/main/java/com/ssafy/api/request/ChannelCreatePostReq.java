package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("RoomCreatePostReq")
public class ChannelCreatePostReq {
    @ApiModelProperty(name="방 이름", example="new room")
    String channelName;
    @ApiModelProperty(name="방장 유저 seq", example="1")
    Long userSeq;
    String channelDesc;
    String channelTag;
    String channelPassword;
}
