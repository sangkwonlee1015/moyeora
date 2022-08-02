package com.ssafy.api.response;

import com.ssafy.db.entity.Channel;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ChannelResponse")
public class ChannelRes {
    Long channelSeq;
    String channelName;
    String channelDesc;
    String channelTag;
    String channelPassword;
    @ApiModelProperty(name="User Seq")
    Long userSeq;

    public static ChannelRes of(Channel channel) {
        ChannelRes res = new ChannelRes();
        res.setChannelName(channel.getChannelName());
        res.setChannelDesc(channel.getChannelDesc());
        res.setChannelPassword(channel.getChannelPassword());
        res.setUserSeq(channel.getUserSeq());
        res.setChannelTag(channel.getChannelTag());
        return res;
    }
}
