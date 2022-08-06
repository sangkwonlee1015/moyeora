package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ParticipantsCreatePostReq")
public class ParticipantsRegisterPostReq {
    private Long channelSeq;
    private Long userSeq;
    private String channelPassword;
}
