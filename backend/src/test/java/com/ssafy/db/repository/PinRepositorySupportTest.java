package com.ssafy.db.repository;

import com.ssafy.db.entity.Pin;
import com.ssafy.db.entity.PinSearchCond;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class PinRepositorySupportTest {
    @Autowired
    PinRepositorySupport pinRepositorySupport;
    @Autowired
    PinRepository pinRepository;

    @Test
    public void testing(){
//        Pin pin1 = new Pin();
//        pin1.setMapSeq(123151L);
//        pin1.setUserSeq(123L);
//        pinRepository.save(pin1);
//
//        Pin pin2 = new Pin();
//        pin2.setMapSeq(123151L);
//        pin2.setUserSeq(356L);
//        pinRepository.save(pin2);
//
//        Pin pin3 = new Pin();
//        pin3.setMapSeq(33333L);
//        pin3.setUserSeq(356L);
//        pinRepository.save(pin3);

        PinSearchCond cond1 = new PinSearchCond();
        cond1.setMapSeq(123151L);

        PinSearchCond cond2 = new PinSearchCond();
        cond2.setUserId(356L);

        System.out.println("Hello! : " + pinRepositorySupport.findAllCond(cond1).toString());
        System.out.println("Hello! : " + pinRepositorySupport.findAllCond(cond2).toString());

    }
}