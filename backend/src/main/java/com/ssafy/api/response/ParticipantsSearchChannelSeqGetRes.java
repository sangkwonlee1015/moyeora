package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Participants;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ParticipantsSearchChannelSeqGetRes extends BaseResponseBody {
    private List<Participants> list;

    public static ParticipantsSearchChannelSeqGetRes of(Integer statusCode, String message, List<Participants> list){
        ParticipantsSearchChannelSeqGetRes res = new ParticipantsSearchChannelSeqGetRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setList(list);
        return res;
    }
}
