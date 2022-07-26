package com.ssafy.api.response;

import com.ssafy.db.entity.Room;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("RoomResponse")
public class RoomRes {
    @ApiModelProperty(name="Room Seq")
    Long roomSeq;
    @ApiModelProperty(name="Room Name")
    String roomName;
    @ApiModelProperty(name="Room Url")
    String roomUrl;
    @ApiModelProperty(name="User Seq")
    Long userSeq;

    public static RoomRes of(Room room) {
        RoomRes res = new RoomRes();
        res.setRoomSeq(room.getRoomSeq());
        res.setRoomName(room.getRoomName());
        res.setRoomUrl(room.getRoomUrl());
        res.setUserSeq(room.getUserSeq());
        return res;
    }
}
