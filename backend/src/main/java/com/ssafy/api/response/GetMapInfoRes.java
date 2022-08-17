package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GetMapInfoRes extends BaseResponseBody {
    private String mapName;

    public static GetMapInfoRes of (Integer statusCode, String message, String mapName){
        GetMapInfoRes res = new GetMapInfoRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setMapName(mapName);
        return res;
    }
}
