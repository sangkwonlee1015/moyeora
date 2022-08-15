package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GetUserNickRes extends BaseResponseBody {
    String userNick;

    public static GetUserNickRes of(Integer statusCode, String message, String userNick){
        GetUserNickRes res = new GetUserNickRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setUserNick(userNick);
        return res;
    }
}
