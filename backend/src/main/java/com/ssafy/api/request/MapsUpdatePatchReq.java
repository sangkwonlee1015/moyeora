package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("MapsUpdatePatchReq")
public class MapsUpdatePatchReq {
    @ApiModelProperty(name="맵 seq", example="1")
    Long mapSeq;
    @ApiModelProperty(name="맵 제목", example="new map")
    String title;
    @ApiModelProperty(name="지도 위도", example="37.42829747263545")
    String lat;
    @ApiModelProperty(name="지도 경도", example="126.76620435615891")
    String lng;
}
