package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("MapsCreatePostReq")
public class MapsCreatePostReq {
    private String mapName;
    private Long channelSeq;
    private Long userSeq;
}
