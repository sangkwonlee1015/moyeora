package com.ssafy.api.service;

import com.ssafy.api.request.RoomCreatePostReq;
import com.ssafy.api.request.RoomUpdatePatchReq;
import com.ssafy.db.entity.Room;

import java.util.List;

public interface RoomService {
    Room createRoom(RoomCreatePostReq roomCreatePostReq);
    List<Room> getRoomByNameContaining(String findName);
    Room updateRoom(RoomUpdatePatchReq roomUpdatePatchReq);
    void deleteRoom(Long roomSeq);
}
