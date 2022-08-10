package com.ssafy.api.controller;

import com.ssafy.api.request.ParticipantsRegisterPostReq;
import com.ssafy.api.response.ParticipantsSearchUserSeqGetRes;
import com.ssafy.api.service.ChannelService;
import com.ssafy.api.service.ParticipantsService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Channel;
import com.ssafy.db.entity.Participants;
import com.ssafy.db.entity.ParticipantsId;
import com.ssafy.db.entity.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;
import java.util.Optional;

@Api(value = "참여자 API", tags = {"Participants"})
@RestController
@RequestMapping("/api/participants")
public class ParticipantController {

    @Autowired
    ParticipantsService participantsService;

    @Autowired
    ChannelService channelService;

    @PostMapping()
    @ApiOperation(value = "참여자 등록", notes = "채널에 유저를 참여자로 등록한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 400, message = "비밀번호가 일치하지 않습니다."),
            @ApiResponse(code = 401, message = "unauthenticated"),

    })
    public ResponseEntity<? extends BaseResponseBody> register(@ApiIgnore Authentication authentication, @RequestBody ParticipantsRegisterPostReq registerInfo){
        if (authentication == null)
            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "unauthenticated"));

        Channel channel = channelService.findByChannelSeq(registerInfo.getChannelSeq());
        if (channel.getChannelPassword() != null && !registerInfo.getChannelPassword().equals(channel.getChannelPassword()))
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "비밀번호가 일치하지 않습니다."));

        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        User user = userDetails.getUser();

        participantsService.registerParticipants(registerInfo, user.getUserSeq());
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "참여자 등록 성공!"));
    }

    @GetMapping("/byUser")
    @ApiOperation(value = "참여자 검색", notes = "유저가 속해 있는 채널 목록을 검색한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "unauthenticated"),
            @ApiResponse(code = 403, message = "unauthorized"),

    })
    public ResponseEntity<? extends BaseResponseBody> searchByUserSeq(@ApiIgnore Authentication authentication){
        if (authentication == null)
            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "unauthenticated"));
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        User user = userDetails.getUser();
        List<Participants> list = participantsService.getParticipantsByUserSeq(user.getUserSeq());
        return ResponseEntity.status(200).body(ParticipantsSearchUserSeqGetRes.of(200, "success", list));
    }

    @GetMapping("/byChannel/{channelSeq}")
    @ApiOperation(value = "참여자 검색", notes = "채널에 속해 있는 유저 목록을 검색한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "unauthenticated"),
            @ApiResponse(code = 403, message = "unauthorized"),

    })
    public ResponseEntity<? extends BaseResponseBody> searchByChannelSeq(@ApiIgnore Authentication authentication, @PathVariable Long channelSeq){
        if (authentication == null)
            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "unauthenticated"));
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        User user = userDetails.getUser();
        if (!participantsService.getParticipantsById(new ParticipantsId(user.getUserSeq(), channelSeq)).isPresent()) {
            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "unauthorized"));
        }

        List<Participants> list = participantsService.getParticipantsByChannelSeq(channelSeq);
        return ResponseEntity.status(200).body(ParticipantsSearchUserSeqGetRes.of(200, "success", list));
    }

    @DeleteMapping(value = {"/{channelSeq}", "/{channelSeq}/{userSeq}"})
    @ApiOperation(value = "채널 나가기", notes = "채널에서 나간다. userSeq가 추가로 올 경우 방장 권한으로 유저 내보내기 가능")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "unauthenticated"),
            @ApiResponse(code = 403, message = "unauthorized"),

    })
    public ResponseEntity<? extends BaseResponseBody> delete(@ApiIgnore Authentication authentication, @PathVariable Long channelSeq, @PathVariable(required = false) Optional<Long> userSeq){
        if (authentication == null)
            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "unauthenticated"));
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        User user = userDetails.getUser();
        if (userSeq.isPresent()){
            Channel channel = channelService.findByChannelSeq(channelSeq);
            if (channel.getUserSeq() == user.getUserSeq()){
                participantsService.deleteParticipants(new ParticipantsId(userSeq.get(), channelSeq));
                return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
            }else
                return ResponseEntity.status(403).body(BaseResponseBody.of(403,"unauthorized"));
        }else{
            participantsService.deleteParticipants(new ParticipantsId(user.getUserSeq(), channelSeq));
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
        }
    }


}
