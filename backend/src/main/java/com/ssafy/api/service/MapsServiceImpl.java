package com.ssafy.api.service;

import com.ssafy.api.request.MapsCreatePostReq;
import com.ssafy.api.request.MapsUpdatePatchReq;
import com.ssafy.db.entity.Maps;
import com.ssafy.db.repository.MapsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service("mapsServie")
public class MapsServiceImpl implements MapsService {

    @Autowired
    MapsRepository mapsRepository;

    @Override
    public Maps createMaps(MapsCreatePostReq mapsCreatePostReq) {
        Maps maps = new Maps();
        maps.setTitle(mapsCreatePostReq.getTitle());
        maps.setRoomSeq(mapsCreatePostReq.getRoomSeq());
        return mapsRepository.save(maps);
    }

    @Override
    public List<Maps> getMapsByRoomSeq(Long roomSeq) {
        return mapsRepository.findMapsByRoomSeq(roomSeq);
    }

    @Override
    public Maps updateMaps(MapsUpdatePatchReq mapsUpdatePatchReq) {
        Optional<Maps> oMaps = mapsRepository.findById(mapsUpdatePatchReq.getMapSeq());
        if(oMaps.isPresent()){
            Maps maps = oMaps.get();
            maps.setTitle(mapsUpdatePatchReq.getTitle());
            maps.setLat(mapsUpdatePatchReq.getLat());
            maps.setLng(mapsUpdatePatchReq.getLng());
            return mapsRepository.save(maps);
        }
        return null;
    }

    @Override
    public void deleteMaps(Long mapsSeq) {
        mapsRepository.deleteById(mapsSeq);
    }
}