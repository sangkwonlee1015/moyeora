package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FileRegisterPostRes extends BaseResponseBody {
    private String id;


    public static FileRegisterPostRes of (Integer statusCode, String message,String id){
        FileRegisterPostRes res = new FileRegisterPostRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setId(id);
        return res;
    }
}
