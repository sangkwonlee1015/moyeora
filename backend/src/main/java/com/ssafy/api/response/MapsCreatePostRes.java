package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("MapsCreatePostRes")
public class MapsCreatePostRes extends BaseResponseBody {
    private Long mapSeq;

    public static MapsCreatePostRes of(Integer statusCode, String message, Long mapSeq){
        MapsCreatePostRes res = new MapsCreatePostRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setMapSeq(mapSeq);
        return res;
    }
}
