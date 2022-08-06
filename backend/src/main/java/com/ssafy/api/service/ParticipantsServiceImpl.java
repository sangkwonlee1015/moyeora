package com.ssafy.api.service;

import com.ssafy.api.request.ParticipantsRegisterPostReq;
import com.ssafy.db.entity.Participants;
import com.ssafy.db.entity.ParticipantsId;
import com.ssafy.db.repository.ParticipantsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service("ParticipantsService")
public class ParticipantsServiceImpl implements ParticipantsService{

    @Autowired
    ParticipantsRepository participantsRepository;

    @Override
    public Optional<Participants> getParticipantsById(ParticipantsId participantsId) {
        Optional<Participants> byId = participantsRepository.findById(participantsId);
        return byId;
    }

    @Override
    public Participants registerParticipants(ParticipantsRegisterPostReq registerInfo) {
        Participants participants = new Participants();
        ParticipantsId id = new ParticipantsId();
        id.setChannelSeq(registerInfo.getChannelSeq());
        id.setUserSeq(registerInfo.getUserSeq());
        participants.setParticipantsId(id);
        return participantsRepository.save(participants);
    }

    @Override
    public void deleteParticipants(ParticipantsId participantsId) {
        participantsRepository.deleteById(participantsId);
    }

    @Override
    public List<Participants> getParticipantsByUserSeq(Long userSeq){
        return participantsRepository.findByUserSeq(userSeq);
    }

    @Override
    public List<Participants> getParticipantsByChannelSeq(Long channelSeq){
        return participantsRepository.findByChannelSeq(channelSeq);
    }
}
