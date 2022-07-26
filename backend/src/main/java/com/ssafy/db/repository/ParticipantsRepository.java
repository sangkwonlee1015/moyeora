package com.ssafy.db.repository;

import com.ssafy.db.entity.Participants;
import com.ssafy.db.entity.ParticipantsId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParticipantsRepository extends JpaRepository<Participants, ParticipantsId> {
}
