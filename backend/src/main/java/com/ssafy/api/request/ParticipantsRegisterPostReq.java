package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ParticipantsCreatePostReq")
public class ParticipantsRegisterPostReq {
    @ApiModelProperty(name="참가한 방", example="new room")
    private Long roomSeq;
    @ApiModelProperty(name="참가 아이디", example="userId")
    private String userId;
}
