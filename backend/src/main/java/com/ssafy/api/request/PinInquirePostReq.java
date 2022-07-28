package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("PinInquirePostReq")
public class PinInquirePostReq {
    @ApiModelProperty(name="지도 인덱스", example="map seq")
    private Long mapSeq;
    @ApiModelProperty(name="방 인덱스", example="room seq")
    private Long roomSeq;
}
