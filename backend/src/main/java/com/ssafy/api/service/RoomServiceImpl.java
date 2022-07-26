package com.ssafy.api.service;

import com.ssafy.api.request.RoomCreatePostReq;
import com.ssafy.db.entity.Room;
import com.ssafy.db.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
}
