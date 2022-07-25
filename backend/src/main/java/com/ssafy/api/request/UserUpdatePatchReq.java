package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserUpdatePatchReq")
public class UserUpdatePatchReq {
    @ApiModelProperty(name="User Password")
    String password;
    @ApiModelProperty(name="User Phone")
    String phone;
    @ApiModelProperty(name="User Name")
    String userName;
    @ApiModelProperty(name="User Nickname")
    String nickname;
}
