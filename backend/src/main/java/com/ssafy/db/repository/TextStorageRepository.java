package com.ssafy.db.repository;

import com.ssafy.db.entity.TextStorage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TextStorageRepository extends JpaRepository<TextStorage, Long> {
    @Query("select t.textSeq, t.textContent, u.userNick, u.userSeq from TextStorage t left join t.user u where t.channelSeq = :channelSeq")
    List<Object[]> findTextInfoByChannelSeq(Long channelSeq);
}
