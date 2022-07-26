package com.ssafy.api.controller;

import com.ssafy.api.request.RoomCreatePostReq;
import com.ssafy.api.response.RoomCreatePostRes;
import com.ssafy.api.response.RoomRes;
import com.ssafy.api.service.RoomService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Room;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@Api(value = "방 API", tags = {"Room"})
@RestController
@RequestMapping("/api/v1/room")
public class RoomController {
    @Autowired
    RoomService roomService;

    @PostMapping()
    @ApiOperation(value = "방 생성", notes = "새로운 방을 만든다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
    })
    public ResponseEntity<? extends BaseResponseBody> create(@ApiIgnore Authentication authentication,
                                                             @RequestBody @ApiParam(value="방 생성 정보", required = true) RoomCreatePostReq roomCreatePostReq) {
        if (authentication == null){
            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "Access Denied"));
        }

        Room room = roomService.createRoom(roomCreatePostReq);

        return ResponseEntity.status(200).body(RoomCreatePostRes.of(200, "Success", RoomRes.of(room)));
    }

    @GetMapping("/{findName}")
    @ApiOperation(value = "방 찾기", notes = "이름으로 방을 찾는다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
    })
    public ResponseEntity<List<Room>> create(@ApiIgnore Authentication authentication,
                                       @PathVariable String findName) {
        if (authentication == null){
            return null;
        }
        List<Room> roomList = roomService.getRoomByNameContaining(findName);

        return ResponseEntity.status(200).body(roomList);
    }
}
