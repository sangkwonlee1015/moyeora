package com.ssafy.api.service;

import com.ssafy.api.request.MapsCreatePostReq;
import com.ssafy.api.request.MapsUpdatePatchReq;
import com.ssafy.db.entity.Maps;

import java.util.List;

public interface MapsService {
    Maps createMaps(MapsCreatePostReq mapsCreatePostReq);
    Maps updateMaps(MapsUpdatePatchReq mapsUpdatePatchReq);
    void deleteMaps(Long mapsSeq);
    Maps findByMapSeq(Long mapSeq);
    List<Maps> findByChannelSeqOrUserSeq(Long channelSeq, Long userSeq);

}
