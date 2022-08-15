package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Channel;
import com.ssafy.db.entity.ChannelSearchObj;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@ApiModel("ChannelSearchGetRes")
public class ChannelSearchGetRes extends BaseResponseBody {
    private List<ChannelSearchObj> channelList;

    public static ChannelSearchGetRes of(Integer statusCode, String message, List<ChannelSearchObj> channelList){
        ChannelSearchGetRes res = new ChannelSearchGetRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setChannelList(channelList);
        return res;
    }
}
