package com.ssafy.api.service;

import com.ssafy.api.request.MapsCreatePostReq;
import com.ssafy.api.request.MapsUpdatePatchReq;
import com.ssafy.db.entity.Maps;
import com.ssafy.db.entity.User;

import java.util.List;
import java.util.Optional;

public interface MapsService {
    Maps createMaps(MapsCreatePostReq mapsCreatePostReq);
    boolean checkAuth(Long mapSeq, Long userSeq);
    Optional<Maps> getMapsByMapSeq(Long mapSeq);
    List<Maps> getMapsByChannelSeq(Long channelSeq);
    List<Maps> getMapsByUserSeq(Long userSeq);
    Maps updateMaps(MapsUpdatePatchReq mapsUpdatePatchReq, User user);
    void deleteMaps(Long mapsSeq);
}
