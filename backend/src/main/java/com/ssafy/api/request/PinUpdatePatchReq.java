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
    private String pinColor;
    private String pinContent;
    private Long pinSeq;
    private Long mapSeq;
}
