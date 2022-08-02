package com.ssafy.api.service;

import com.ssafy.api.request.ChannelCreatePostReq;
import com.ssafy.api.request.ChannelUpdatePatchReq;
import com.ssafy.db.entity.Channel;

import java.util.List;

public interface ChannelService {
    Channel registerChannel(ChannelCreatePostReq channelCreatePostReq);
    List<Channel> getChannelByNameContaining(String findName);
    Channel updateChannel(ChannelUpdatePatchReq channelUpdatePatchReq);
    void deleteChannel(Long roomSeq);
}
