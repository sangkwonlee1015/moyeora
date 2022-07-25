package com.ssafy.db.repository;

import com.ssafy.db.entity.Pin;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class PinRepositoryTest {
    @Autowired
    PinRepository pinRepository;

    @Test
    public void testing(){
        Pin pin = new Pin();
        pin.setUserId("didnlie");
        LocalDateTime date = LocalDateTime.now();
        pin.setTime(date);

        pinRepository.save(pin);
    }

}