package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GetFileRes extends BaseResponseBody {
    private byte[] data;

    public static GetFileRes of (Integer statusCode, String message, byte[] data){
        GetFileRes res = new GetFileRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setData(data);
        return res;
    }

}
