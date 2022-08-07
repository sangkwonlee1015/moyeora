package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ChannelRegisterPostRes")
public class ChannelRegisterPostRes extends BaseResponseBody {
    private Long channelSeq;

    public static ChannelRegisterPostRes of(Integer statusCode, String message, Long channelSeq) {
        ChannelRegisterPostRes res = new ChannelRegisterPostRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setChannelSeq(channelSeq);
        return res;
    }
}
