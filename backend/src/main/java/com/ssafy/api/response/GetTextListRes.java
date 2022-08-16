package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.TextStorage;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@ApiModel("GetTextListRes")
public class GetTextListRes extends BaseResponseBody {
    private List<Object[]> textStorageList;

    public static GetTextListRes of(Integer statusCode, String message, List<Object[]> textStorageList){
        GetTextListRes res = new GetTextListRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setTextStorageList(textStorageList);
        return res;
    }
}
