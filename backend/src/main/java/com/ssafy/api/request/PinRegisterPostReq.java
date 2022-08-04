package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import java.time.LocalDateTime;

@Getter
@Setter
@ApiModel("PinRegisterPostRequest")
public class PinRegisterPostReq {
    private String pinContent;
    private String pinLat;
    private String pinLng;
    private String pinColor;
    private Integer pinOrder;
    private Long mapSeq;
}
