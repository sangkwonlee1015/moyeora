package com.ssafy.db.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.Pin;
import com.ssafy.db.entity.PinSearchCond;
import com.ssafy.db.entity.QPin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PinRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QPin qPin = QPin.pin;

    public List<Pin> findAllCond(PinSearchCond pinSearchCond){
        Long mapSeq = pinSearchCond.getMapSeq();
        String userId = pinSearchCond.getUserId();

        QPin pin = QPin.pin;
        BooleanBuilder builder = new BooleanBuilder();
        if(userId != null){
            builder.and(pin.userId.eq(userId));
        }
        if(mapSeq != null){
            builder.and(pin.mapSeq.eq(mapSeq));
        }

        List<Pin> result = jpaQueryFactory.select(pin).from(pin).where(builder).fetch();
        return result;
    }

}
