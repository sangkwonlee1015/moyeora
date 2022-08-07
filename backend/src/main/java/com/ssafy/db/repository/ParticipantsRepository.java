package com.ssafy.db.repository;

import com.ssafy.db.entity.Participants;
import com.ssafy.db.entity.ParticipantsId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ParticipantsRepository extends JpaRepository<Participants, ParticipantsId> {
    @Query(
            value="select p from Participants p where p.participantsId.userSeq = :userSeq"
    )
    List<Participants> findByUserSeq(@Param("userSeq") Long userSeq);

    @Query(
            value="select p from Participants p where p.participantsId.channelSeq = :channelSeq"
    )
    List<Participants> findByChannelSeq(@Param("channelSeq") Long channelSeq);
}
