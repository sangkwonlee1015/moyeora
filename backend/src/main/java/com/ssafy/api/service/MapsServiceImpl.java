package com.ssafy.api.service;

import com.ssafy.api.request.MapsCreatePostReq;
import com.ssafy.api.request.MapsUpdatePatchReq;
import com.ssafy.db.entity.Maps;
import com.ssafy.db.repository.MapsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service("mapsService")
public class MapsServiceImpl implements MapsService {

    @Autowired
    MapsRepository mapsRepository;

    @Override
    public Maps createMaps(MapsCreatePostReq mapsCreatePostReq) {
        Maps maps = new Maps();
        maps.setMapName(mapsCreatePostReq.getMapName());
        if(mapsCreatePostReq.getChannelSeq() > 0)
            maps.setChannelSeq(mapsCreatePostReq.getChannelSeq());
        if(mapsCreatePostReq.getUserSeq() > 0)
            maps.setUserSeq(mapsCreatePostReq.getUserSeq());
        return mapsRepository.save(maps);
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
}
