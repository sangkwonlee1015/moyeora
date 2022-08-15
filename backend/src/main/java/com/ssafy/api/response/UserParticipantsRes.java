package com.ssafy.api.response;

import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserParticipantsResponse")
public class UserParticipantsRes {
    @ApiModelProperty(name="User Name")
    String userName;
    @ApiModelProperty(name="User Nickname")
    String userNick;

    public static UserParticipantsRes of(User user) {
        UserParticipantsRes res = new UserParticipantsRes();
        res.setUserName(user.getUserName());
        res.setUserNick(user.getUserNick());

        return res;
    }
}



