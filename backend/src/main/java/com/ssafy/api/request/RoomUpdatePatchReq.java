package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("RoomUpdatePatchReq")
public class RoomUpdatePatchReq {
    @ApiModelProperty(name="방 seq", example="1")
    Long roomSeq;
    @ApiModelProperty(name="방 이름", example="new room")
    String roomName;
    @ApiModelProperty(name="방장 유저 seq", example="1")
    Long userSeq;
}
