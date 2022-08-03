package com.ssafy.api.service;

import com.ssafy.api.request.MapsCreatePostReq;
import com.ssafy.api.request.MapsUpdatePatchReq;
import com.ssafy.db.entity.Maps;

import java.util.List;

public interface MapsService {
    Maps createMaps(MapsCreatePostReq mapsCreatePostReq);
    List<Maps> getMapsByChannelSeq(Long channelSeq);
    List<Maps> getMapsByUserSeq(Long userSeq);
    Maps updateMaps(MapsUpdatePatchReq mapsUpdatePatchReq);
    void deleteMaps(Long mapsSeq);
}
