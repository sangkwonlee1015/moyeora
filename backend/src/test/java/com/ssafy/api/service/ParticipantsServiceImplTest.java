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

}