package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("RoomCreatePostRes")
public class RoomCreatePostRes extends BaseResponseBody {
    RoomRes roomRes;

    public static RoomCreatePostRes of(Integer statusCode, String message, RoomRes roomRes) {
        RoomCreatePostRes res = new RoomCreatePostRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setRoomRes(roomRes);
        return res;
    }
}
