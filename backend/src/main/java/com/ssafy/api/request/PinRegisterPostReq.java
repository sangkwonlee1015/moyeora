package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@ApiModel("PinRegisterPostRequest")
public class PinRegisterPostReq {
    @ApiModelProperty(name="lat")
    String lat;
    @ApiModelProperty(name="lng")
    String lng;
    @ApiModelProperty(name="time")
    LocalDateTime time;
    @ApiModelProperty(name="content")
    String content;
    @ApiModelProperty(name="color")
    Integer color;
    @ApiModelProperty(name="mapSeq")
    Long mapSeq;
    @ApiModelProperty(name="userId")
    String userId;
    @ApiModelProperty(name="roomSeq")
    Long roomSeq;
}
