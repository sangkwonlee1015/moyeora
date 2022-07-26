package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("PinDeletePostReq")
public class PinDeletePostReq {
    @ApiModelProperty(name="방 인덱스", example="room seq")
    private Long roomSeq;
    @ApiModelProperty(name="핀 인덱스", example="pin seq")
    private Long pinSeq;
}
