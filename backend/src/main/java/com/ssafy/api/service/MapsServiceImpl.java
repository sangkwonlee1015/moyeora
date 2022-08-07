package com.ssafy.api.service;

import com.ssafy.api.request.MapsCreatePostReq;
import com.ssafy.api.request.MapsUpdatePatchReq;
import com.ssafy.db.entity.Maps;
import com.ssafy.db.entity.ParticipantsId;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.MapsRepository;
import com.ssafy.db.repository.ParticipantsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service("mapsService")
public class MapsServiceImpl implements MapsService {

    @Autowired
    MapsRepository mapsRepository;

    @Autowired
    ParticipantsRepository participantsRepository;

    @Override
    public Maps createMaps(MapsCreatePostReq mapsCreatePostReq) {
        Maps maps = new Maps();
        maps.setMapName(mapsCreatePostReq.getMapName());
        maps.setChannelSeq(mapsCreatePostReq.getChannelSeq());
        maps.setUserSeq(mapsCreatePostReq.getUserSeq());

        return mapsRepository.save(maps);
    }

    @Override
    public boolean checkAuth(Long mapSeq, Long userSeq) {
        Optional<Maps> oMaps = mapsRepository.findById(mapSeq);
        if(oMaps.isPresent()){
            Maps maps = oMaps.get();
            if(maps.getUserSeq() == userSeq)
                return true;
            if(participantsRepository.findById(new ParticipantsId(userSeq, maps.getChannelSeq())).isPresent())
                return true;
        }
        return false;
    }

    @Override
    public Optional<Maps> getMapsByMapSeq(Long mapSeq) {
        return mapsRepository.findById(mapSeq);
    }

    @Override
    public List<Maps> getMapsByChannelSeq(Long channelSeq) {
        return mapsRepository.findMapsByChannelSeq(channelSeq);
    }

    @Override
    public List<Maps> getMapsByUserSeq(Long userSeq) {
        return mapsRepository.findMapsByUserSeq(userSeq);
    }


    @Override
    public Maps updateMaps(MapsUpdatePatchReq mapsUpdatePatchReq) {
        Optional<Maps> oMaps = mapsRepository.findById(mapsUpdatePatchReq.getMapSeq());
        if(oMaps.isPresent()){
            Maps maps = oMaps.get();
            maps.setMapName(mapsUpdatePatchReq.getMapName());
            return mapsRepository.save(maps);
        }
        return null;
    }

    @Override
    public void deleteMaps(Long mapsSeq) {
        mapsRepository.deleteById(mapsSeq);
    }

    @Override
    public Maps findByMapSeq(Long mapSeq) {
        Optional<Maps> map = mapsRepository.findByMapSeq(mapSeq);
        if (map.isPresent())
            return map.get();
        else
            return null;
    }

    @Override
    public List<Maps> findByChannelSeqOrUserSeq(Long channelSeq, Long userSeq) {
        return mapsRepository.findByChannelSeqOrUserSeq(channelSeq, userSeq);
    }

}
