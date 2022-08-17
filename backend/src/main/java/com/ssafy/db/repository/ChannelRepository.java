package com.ssafy.db.repository;


import com.ssafy.db.entity.Channel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChannelRepository extends JpaRepository<Channel, Long> {
    Optional<Channel> findByChannelSeq(Long channelSeq);
    List<Channel> findByChannelNameContainingAndChannelTagContaining(String channelName, String channelTag);
    Optional<Channel> findByChannelSeqAndUserSeq(Long channelSeq, Long userSeq);
}
