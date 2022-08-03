package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@ApiModel("MapsCreatePostReq")
public class MapsCreatePostReq {
    @NotBlank
    @ApiModelProperty(name="맵 이름", example="new map")
    String mapName;
    @ApiModelProperty(name="채널 seq", example="1")
    long channelSeq;
    @ApiModelProperty(name="유저 seq", example="1")
    long userSeq;
}
