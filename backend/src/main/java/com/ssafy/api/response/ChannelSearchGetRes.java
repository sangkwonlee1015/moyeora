package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Channel;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@ApiModel("ChannelSearchGetRes")
public class ChannelSearchGetRes extends BaseResponseBody {
    private List<Channel> channelList;

    public static ChannelSearchGetRes of(Integer statusCode, String message, List<Channel> channelList){
        ChannelSearchGetRes res = new ChannelSearchGetRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setChannelList(channelList);
        return res;
    }
}
