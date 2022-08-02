package com.ssafy.api.controller;

import com.ssafy.api.request.ChannelCreatePostReq;
import com.ssafy.api.request.ChannelUpdatePatchReq;
import com.ssafy.api.response.ChannelCreatePostRes;
import com.ssafy.api.response.ChannelRes;
import com.ssafy.api.service.ChannelService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Channel;
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
public class ChannelController {
    @Autowired
    ChannelService channelService;

    @PostMapping()
    @ApiOperation(value = "방 생성", notes = "새로운 방을 만든다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
    })
    public ResponseEntity<? extends BaseResponseBody> create(@ApiIgnore Authentication authentication,
                                                             @RequestBody @ApiParam(value="방 생성 정보", required = true) ChannelCreatePostReq channelCreatePostReq) {
        if (authentication == null){
            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "Access Denied"));
        }

        Channel channel = channelService.registerChannel(channelCreatePostReq);

        return ResponseEntity.status(200).body(ChannelCreatePostRes.of(200, "Success", ChannelRes.of(channel)));
    }

    @GetMapping("/{findName}")
    @ApiOperation(value = "방 찾기", notes = "이름으로 방을 찾는다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
    })
    public ResponseEntity<List<Channel>> search(@ApiIgnore Authentication authentication,
                                                @PathVariable String findName) {
        if (authentication == null){
            return null;
        }
        List<Channel> channelList = channelService.getChannelByNameContaining(findName);

        return ResponseEntity.status(200).body(channelList);
    }

    @PatchMapping()
    @ApiOperation(value = "방 정보 수정", notes = "방 정보를 수정한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
    })
    public ResponseEntity<? extends BaseResponseBody> update(@ApiIgnore Authentication authentication,
                                             @RequestBody @ApiParam(value="방 수정 정보", required = true) ChannelUpdatePatchReq channelUpdatePatchReq) {
        if (authentication == null){
            return null;
        }

        channelService.updateChannel(channelUpdatePatchReq);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @DeleteMapping("/{roomSeq}")
    @ApiOperation(value = "방 삭제", notes = "방을 삭제한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
    })
    public ResponseEntity<? extends BaseResponseBody> delete(@ApiIgnore Authentication authentication,
                                                             @PathVariable Long roomSeq) {
        if (authentication == null){
            return null;
        }

        channelService.deleteChannel(roomSeq);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }
}
