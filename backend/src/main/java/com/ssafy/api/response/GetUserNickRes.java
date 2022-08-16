package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GetUserNickRes extends BaseResponseBody {
//    User user;

//    UserParticipantsRes userParticipantsRes;
    private String userName;
    private String userNick;
    public static GetUserNickRes of(Integer statusCode, String message, String userName, String userNick){
        GetUserNickRes res = new GetUserNickRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setUserName(userName);
        res.setUserNick(userNick);
        return res;
    }
}
