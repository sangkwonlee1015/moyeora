package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("MapCreatePostReq")
public class MapsCreatePostReq {
    @ApiModelProperty(name="맵 제목", example="new map")
    String title;
    @ApiModelProperty(name="방 seq", example="1")
    long roomSeq;
}
