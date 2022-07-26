package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@ApiModel("PinUpdatePatchRequest")
public class PinUpdatePatchReq {
    @ApiModelProperty(name="pinSeq")
    Long pinSeq;
    @ApiModelProperty(name="time")
    LocalDateTime time;
    @ApiModelProperty(name="content")
    String content;
    @ApiModelProperty(name="color")
    Integer color;
    @ApiModelProperty(name="userId")
    String userId;
    @ApiModelProperty(name="mapSeq")
    Long mapSeq;
    @ApiModelProperty(name = "roomSeq")
    Long roomSeq;
}
