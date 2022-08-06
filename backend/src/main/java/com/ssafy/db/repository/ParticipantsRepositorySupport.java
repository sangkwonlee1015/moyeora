package com.ssafy.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.Participants;
import com.ssafy.db.entity.QParticipants;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ParticipantsRepositorySupport {
    private JPAQueryFactory jpaQueryFactory;

    QParticipants qParticipants = QParticipants.participants;

    public List<Participants> findByUserSeq(Long userSeq){
        List<Participants> list = jpaQueryFactory.select(qParticipants).from(qParticipants).where(qParticipants.participantsId.userSeq.eq(userSeq)).fetch();
        return list;
    }

    public List<Participants> findByChannelSeq(Long channelSeq){
        List<Participants> list = jpaQueryFactory.select(qParticipants).from(qParticipants).where(qParticipants.participantsId.channelSeq.eq(channelSeq)).fetch();
        return list;
    }
}
