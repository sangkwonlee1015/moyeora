package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("RoomCreatePostRes")
public class ChannelCreatePostRes extends BaseResponseBody {
    ChannelRes channelRes;

    public static ChannelCreatePostRes of(Integer statusCode, String message, ChannelRes channelRes) {
        ChannelCreatePostRes res = new ChannelCreatePostRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setChannelRes(channelRes);
        return res;
    }
}
