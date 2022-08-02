package com.ssafy.api.service;

import com.ssafy.api.request.ChannelCreatePostReq;
import com.ssafy.api.request.ChannelUpdatePatchReq;
import com.ssafy.db.entity.Channel;
import com.ssafy.db.repository.ChannelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service("channelService")
public class ChannelServiceImpl implements ChannelService {

    @Autowired
    ChannelRepository channelRepository;

    @Override
    public Channel registerChannel(ChannelCreatePostReq channelCreatePostReq) {
        Channel channel = new Channel();
        channel.setChannelName(channelCreatePostReq.getChannelName());
        channel.setChannelDesc(channelCreatePostReq.getChannelDesc());
        channel.setChannelTag(channelCreatePostReq.getChannelTag());
        channel.setChannelPassword(channelCreatePostReq.getChannelPassword());
        channel.setUserSeq(channelCreatePostReq.getUserSeq());
        return channelRepository.save(channel);
    }

    @Override
    public List<Channel> getChannelByNameContaining(String findName) {
        return channelRepository.findByChannelNameContaining(findName);
    }

    @Override
    public Channel updateChannel(ChannelUpdatePatchReq channelUpdatePatchReq) {
        Optional<Channel> oChannel = channelRepository.findById(channelUpdatePatchReq.getChannelSeq());
        if(oChannel.isPresent()){
            Channel channel = oChannel.get();
            channel.setChannelName(channelUpdatePatchReq.getChannelName());
            channel.setUserSeq(channelUpdatePatchReq.getUserSeq());
            return channelRepository.save(channel);
        }
        return null;
    }

    @Override
    public void deleteChannel(Long channelSeq) {
        channelRepository.deleteById(channelSeq);
    }
}
