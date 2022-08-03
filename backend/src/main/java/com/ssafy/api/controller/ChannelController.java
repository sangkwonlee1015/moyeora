package com.ssafy.api.controller;

import com.ssafy.api.request.ChannelRegisterPostReq;
import com.ssafy.api.request.ChannelUpdatePatchReq;
import com.ssafy.api.response.ChannelRegisterPostRes;
import com.ssafy.api.response.ChannelSearchGetRes;
import com.ssafy.api.service.ChannelService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Channel;
import com.ssafy.db.entity.User;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@Api(value = "채널 API", tags = {"Channel"})
@RestController
@RequestMapping("/api/channel")
public class ChannelController {
    @Autowired
    ChannelService channelService;

    @PostMapping()
    @ApiOperation(value = "채널 생성", notes = "새로운 채널을 개설한다.")
    @ApiResponses({@ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 400, message = "채널 이름으로 공백은 불가능합니다."), @ApiResponse(code = 401, message = "unauthenticated")})
    public ResponseEntity<? extends BaseResponseBody> register(@ApiIgnore Authentication authentication, @Validated @RequestBody @ApiParam(value = "방 생성 정보", required = true) ChannelRegisterPostReq channelRegisterPostReq, BindingResult bindingResult) {
        if (authentication == null) return ResponseEntity.status(401).body(BaseResponseBody.of(401, "unauthenticated"));
        if (bindingResult.hasErrors())
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "채널 이름으로 공백은 불가능합니다."));
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        User user = userDetails.getUser();

        Channel channel = channelService.registerChannel(channelRegisterPostReq, user.getUserSeq());

        return ResponseEntity.status(201).body(ChannelRegisterPostRes.of(201, "Success", channel.getChannelSeq()));
    }

    @GetMapping()
    @ApiOperation(value = "채널 검색", notes = "이름 혹은 태그로 채널 목록을 불러온다.")
    @ApiResponses({@ApiResponse(code = 200, message = "성공"),})
    public ResponseEntity<ChannelSearchGetRes> search(@RequestParam(required = false) String channelName, @RequestParam(required = false) String channelTag) {
        List<Channel> channelList = channelService.findByChannelNameContainingAndChannelTagContaining(channelName, channelTag);

        return ResponseEntity.status(200).body(ChannelSearchGetRes.of(200, "success", channelList));
    }

    @PatchMapping()
    @ApiOperation(value = "채널 정보 수정", notes = "채널 정보를 수정한다.")
    @ApiResponses({@ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 400, message = "채널 이름으로 공백은 불가능합니다."), @ApiResponse(code = 401, message = "unauthenticated"), @ApiResponse(code = 403, message = "unauthorized")})
    public ResponseEntity<? extends BaseResponseBody> update(@ApiIgnore Authentication authentication, @Validated @RequestBody @ApiParam(value = "방 수정 정보", required = true) ChannelUpdatePatchReq channelUpdatePatchReq, BindingResult bindingResult) {
        if (authentication == null) return ResponseEntity.status(401).body(BaseResponseBody.of(401, "unauthenticated"));
        if (bindingResult.hasErrors())
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "채널 이름으로 공백은 불가능합니다."));
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        User user = userDetails.getUser();

        if (!channelService.findByChannelSeqAndUserSeq(channelUpdatePatchReq.getChannelSeq(), user.getUserSeq()))
            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "unauthorized"));

        channelService.updateChannel(channelUpdatePatchReq);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @DeleteMapping("/{channelSeq}")
    @ApiOperation(value = "채널 삭제", notes = "채널을 삭제한다.")
    @ApiResponses({@ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 400, message = "not our user"), @ApiResponse(code = 401, message = "unauthenticated"), @ApiResponse(code = 403, message = "unauthorized")})
    public ResponseEntity<? extends BaseResponseBody> delete(@ApiIgnore Authentication authentication, @PathVariable Long channelSeq) {
        if (authentication == null) return ResponseEntity.status(401).body(BaseResponseBody.of(401, "unauthenticated"));
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        User user = userDetails.getUser();

        if (!channelService.findByChannelSeqAndUserSeq(channelSeq, user.getUserSeq()))
            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "unauthorized"));

        channelService.deleteChannel(channelSeq);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }
}
