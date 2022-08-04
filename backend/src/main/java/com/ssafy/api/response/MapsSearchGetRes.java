package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Maps;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class MapsSearchGetRes extends BaseResponseBody {
    private List<Maps> mapList;

    public static MapsSearchGetRes of(Integer statusCode, String message, List<Maps> mapList){
        MapsSearchGetRes res = new MapsSearchGetRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setMapList(mapList);
        return res;
    }
}
