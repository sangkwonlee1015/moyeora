package com.ssafy.api.service;

import com.ssafy.api.request.RoomCreatePostReq;
import com.ssafy.api.request.RoomUpdatePatchReq;
import com.ssafy.db.entity.Maps;
import com.ssafy.db.entity.Room;
import com.ssafy.db.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service("roomServie")
public class RoomServiceImpl implements RoomService {

    @Autowired
    RoomRepository roomRepository;

    @Override
    public Room createRoom(RoomCreatePostReq roomCreatePostReq) {
        Room room = new Room();
        room.setRoomName(roomCreatePostReq.getRoomName());
        room.setRoomUrl(roomCreatePostReq.getRoomUrl());
        room.setUserSeq(roomCreatePostReq.getUserSeq());
        return roomRepository.save(room);
    }

    @Override
    public List<Room> getRoomByNameContaining(String findName) {
        return roomRepository.findByRoomNameContaining(findName);
    }

    @Override
    public Room updateRoom(RoomUpdatePatchReq roomUpdatePatchReq) {
        Optional<Room> oRoom = roomRepository.findById(roomUpdatePatchReq.getRoomSeq());
        if(oRoom.isPresent()){
            Room room = oRoom.get();
            room.setRoomName(roomUpdatePatchReq.getRoomName());
            room.setUserSeq(roomUpdatePatchReq.getUserSeq());
            return roomRepository.save(room);
        }
        return null;
    }

    @Override
    public void deleteRoom(Long roomSeq) {
        roomRepository.deleteById(roomSeq);
    }
}
