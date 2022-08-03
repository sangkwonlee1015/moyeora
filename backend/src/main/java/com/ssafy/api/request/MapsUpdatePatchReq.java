package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

@Getter
@Setter
@ApiModel("MapsUpdatePatchReq")
public class MapsUpdatePatchReq {
    @Positive
    @ApiModelProperty(name="맵 seq", example="1")
    Long mapSeq;
    @NotBlank
    @ApiModelProperty(name="맵 이름", example="new map")
    String mapName;
}
