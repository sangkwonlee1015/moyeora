package com.ssafy.api.service;

import com.ssafy.api.request.ParticipantsRegisterPostReq;
import com.ssafy.db.entity.Participants;
import com.ssafy.db.entity.ParticipantsId;

import java.util.Optional;

public interface ParticipantsService {
    Optional<Participants> getParticipantsById(ParticipantsId participantsId);
    Participants registerParticipants(ParticipantsRegisterPostReq registerInfo);
    void deleteParticipants(ParticipantsId participantsId);
}
