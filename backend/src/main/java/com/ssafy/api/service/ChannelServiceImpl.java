package com.ssafy.api.service;

import com.ssafy.api.request.ChannelRegisterPostReq;
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
    public Channel registerChannel(ChannelRegisterPostReq channelRegisterPostReq, Long userSeq) {
        Channel channel = new Channel();
        channel.setChannelName(channelRegisterPostReq.getChannelName());
        channel.setChannelDesc(channelRegisterPostReq.getChannelDesc());
        channel.setChannelTag(channelRegisterPostReq.getChannelTag());
        if (channelRegisterPostReq.getChannelPassword().isEmpty())
            channel.setChannelPassword(null);
        else
            channel.setChannelPassword(channelRegisterPostReq.getChannelPassword());
        channel.setUserSeq(userSeq);
        return channelRepository.save(channel);
    }

    @Override
    public List<Channel> findByChannelNameContainingAndChannelTagContaining(String channelName, String channelTag) {
        return channelRepository.findByChannelNameContainingAndChannelTagContaining(channelName, channelTag);
    }


    @Override
    public boolean updateChannel(ChannelUpdatePatchReq channelUpdatePatchReq) {
        Optional<Channel> oChannel = channelRepository.findById(channelUpdatePatchReq.getChannelSeq());
        if(oChannel.isPresent()){
            Channel channel = oChannel.get();
            channel.setChannelName(channelUpdatePatchReq.getChannelName());
            channel.setChannelDesc(channelUpdatePatchReq.getChannelDesc());
            channel.setChannelTag(channelUpdatePatchReq.getChannelTag());
            if (channelUpdatePatchReq.getChannelPassword().isEmpty())
                channel.setChannelPassword(null);
            else
                channel.setChannelPassword(channelUpdatePatchReq.getChannelPassword());
            channelRepository.save(channel);
            return true;
        }
        return false;
    }

    @Override
    public boolean findByChannelSeqAndUserSeq(Long channelSeq, Long userSeq) {
        Optional<Channel> oChannel = channelRepository.findByChannelSeqAndUserSeq(channelSeq, userSeq);
        if (oChannel.isPresent())
            return true;
        else
            return false;
    }

    @Override
    public void deleteChannel(Long channelSeq) {
        channelRepository.deleteById(channelSeq);
    }
}
