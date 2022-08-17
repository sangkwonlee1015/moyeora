package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;

@Getter
@Setter
public class GetChannelInfoRes extends BaseResponseBody {
    private String channelName;
    private String channelDesc;
    private String channelTag;
    private byte[] uploadedImage;
    private String channelPassword;
    private Long userSeq;

    public static GetChannelInfoRes of (Integer statusCode, String message, String channelName, String channelDesc, String channelTag, byte[] uploadedImage, String channelPassword, Long userSeq){
        GetChannelInfoRes res = new GetChannelInfoRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setChannelName(channelName);
        res.setChannelDesc(channelDesc);
        res.setChannelTag(channelTag);
        res.setUploadedImage(uploadedImage);
        res.setChannelPassword(channelPassword);
        res.setUserSeq(userSeq);
        return res;
    }

}
