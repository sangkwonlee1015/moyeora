package com.ssafy.api.response;

import com.ssafy.api.request.ParticipantsRegisterPostReq;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Participants;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ParticipantsSearchUserSeqGetRes extends BaseResponseBody {
    private List<Participants> list;

    public static ParticipantsSearchUserSeqGetRes of(Integer statusCode, String message, List<Participants> list){
        ParticipantsSearchUserSeqGetRes res = new ParticipantsSearchUserSeqGetRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setList(list);
        return res;
    }
}
