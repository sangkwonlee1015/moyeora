package com.ssafy.api.service;

import com.ssafy.api.request.ParticipantsRegisterPostReq;
import com.ssafy.db.entity.Participants;
import com.ssafy.db.entity.ParticipantsId;

import java.util.List;
import java.util.Optional;

public interface ParticipantsService {
    Optional<Participants> getParticipantsById(ParticipantsId participantsId);
    Participants registerParticipants(ParticipantsRegisterPostReq registerInfo, Long userSeq);
    void deleteParticipants(ParticipantsId participantsId);
    List<Participants> getParticipantsByUserSeq(Long userSeq);
    List<Participants> getParticipantsByChannelSeq(Long channelSeq);
}
