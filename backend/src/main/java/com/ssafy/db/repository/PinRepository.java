package com.ssafy.db.repository;


import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.Pin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PinRepository extends JpaRepository<Pin, Long> {
    List<Pin> findByMapSeq(Long mapSeq);
    Optional<Pin> findByPinSeq(Long pinSeq);
    Integer countByMapSeqAndPinFlag(Long mapSeq, int pinFlag);
    List<Pin> findByMapSeqAndPinFlagAndPinOrderGreaterThan(Long mapSeq, int pinFlag, int pinOrder);
    List<Pin> findByMapSeqAndPinFlagAndPinOrderGreaterThanEqual(Long mapSeq, int pinFlag, int pinOrder);
    Optional<Pin> findByMapSeqAndPinFlagAndPinOrder(Long mapSeq, int pinFlag, int pinOrder);
    List<Pin> findByMapSeqAndPinFlagAndPinOrderBetween(Long mapSeq, int pinFlag, int fromInt, int toInt);
}
