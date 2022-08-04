package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Maps;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@ApiModel("MapsListGetRes")
public class MapsListGetRes extends BaseResponseBody {
    List<Maps> mapsList;

    public static MapsListGetRes of(Integer statusCode, String message, List<Maps> mapsList){
        MapsListGetRes res = new MapsListGetRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setMapsList(mapsList);
        return res;
    }
}
