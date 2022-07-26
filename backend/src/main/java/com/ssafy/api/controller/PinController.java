package com.ssafy.api.controller;

import com.ssafy.api.request.*;
import com.ssafy.api.service.ParticipantsService;
import com.ssafy.api.service.PinService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Participants;
import com.ssafy.db.entity.ParticipantsId;
import com.ssafy.db.entity.Pin;
import com.ssafy.db.entity.User;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@Api(value = "Pin API", tags = {"Pin."})
@RestController
@RequestMapping("/api/v1/pin")
public class PinController {
    @Autowired
    PinService pinService;

    @Autowired
    ParticipantsService participantsService;

    @PostMapping()
    @ApiOperation(value = "Pin 등록", notes = "원하는 핀 정보를 등록한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 403, message = "권한 없음"),
    })
    public ResponseEntity<? extends BaseResponseBody> register(@ApiIgnore Authentication authentication,
            @RequestBody @ApiParam(value = "회원가입 정보", required = true) PinRegisterPostReq registerInfo){
        if (authentication == null){
            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "Access Denied"));
        }
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();
        if (!participantsService.getParticipantsById(new ParticipantsId(userId, registerInfo.getRoomSeq())).isPresent()){
            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "Access Denied"));
        }
        pinService.createPin(registerInfo);

        return ResponseEntity.status(201).body(BaseResponseBody.of(201, "Success"));
    }

    @PatchMapping()
    @ApiOperation(value = "핀 정보 수정", notes = "원하는 핀의 정보를 수정한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 403, message = "권한 없음"),
    })
    public ResponseEntity<? extends BaseResponseBody> update(@ApiIgnore Authentication authentication, @RequestBody @ApiParam(value = "회원수정 정보", required = true) PinUpdatePatchReq updateInfo){
        if (authentication == null){
            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "Access Denied"));
        }
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();
        if (!participantsService.getParticipantsById(new ParticipantsId(userId, updateInfo.getRoomSeq())).isPresent()){
            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "Access Denied"));
        }
        Pin pin = pinService.updatePin(updateInfo);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @PostMapping("/delete")
    @ApiOperation(value = "핀 정보 삭제", notes = "원하는 핀의 정보를 삭제한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 403, message = "권한 없음"),
    })
    public ResponseEntity<? extends BaseResponseBody> delete(@ApiIgnore Authentication authentication, @RequestBody @ApiParam(value = "핀 삭제 정보", required = true)PinDeletePostReq deleteInfo) {
        if (authentication == null){
            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "Access Denied"));
        }
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();
        if (!participantsService.getParticipantsById(new ParticipantsId(userId, deleteInfo.getRoomSeq())).isPresent()){
            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "Access Denied"));
        }
        pinService.deletePin(deleteInfo.getPinSeq());
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }
}
