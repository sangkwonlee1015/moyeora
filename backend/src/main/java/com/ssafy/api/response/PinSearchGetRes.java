package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Pin;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@ApiModel("PinSearchGetRes")
public class PinSearchGetRes extends BaseResponseBody {
    private List<Pin> pinList;

    public static PinSearchGetRes of(Integer statusCode, String message, List<Pin> pinList){
        PinSearchGetRes res = new PinSearchGetRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setPinList(pinList);
        return res;
    }
}
