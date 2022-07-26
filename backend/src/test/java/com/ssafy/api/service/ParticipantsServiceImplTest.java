package com.ssafy.api.service;

import com.ssafy.api.request.ParticipantsRegisterPostReq;
import com.ssafy.db.entity.Participants;
import com.ssafy.db.entity.ParticipantsId;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;



@SpringBootTest
class ParticipantsServiceImplTest {
    @Autowired
    ParticipantsService participantsService;

    @Test
    public void testing(){
        ParticipantsId participantsId = new ParticipantsId();
        participantsId.setUserId("didnlie");
        participantsId.setRoomSeq(1L);

        ParticipantsRegisterPostReq participantsRegisterPostReq = new ParticipantsRegisterPostReq();
        participantsRegisterPostReq.setRoomSeq(1L);
        participantsRegisterPostReq.setUserId("didnlie");

        participantsService.deleteParticipants(participantsId);

        Participants p = participantsService.registerParticipants(participantsRegisterPostReq);

        Assertions.assertThat(participantsService.getParticipantsById(participantsId).get()).isEqualTo(p);
    }
}