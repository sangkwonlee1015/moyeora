package com.ssafy.api.service;

import com.ssafy.api.request.ChannelRegisterPostReq;
import com.ssafy.api.request.ChannelUpdatePatchReq;
import com.ssafy.db.entity.Channel;

import java.util.List;
import java.util.Optional;

public interface ChannelService {
    Channel registerChannel(ChannelRegisterPostReq channelRegisterPostReq, Long userSeq);
    List<Channel> findByChannelNameContainingAndChannelTagContaining(String channelName, String channelTag);
    boolean updateChannel(ChannelUpdatePatchReq channelUpdatePatchReq);
    boolean findByChannelSeqAndUserSeq(Long channelSeq, Long userSeq);
    void deleteChannel(Long roomSeq);
}
