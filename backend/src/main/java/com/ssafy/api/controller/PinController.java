package com.ssafy.api.controller;

import com.ssafy.api.request.*;
import com.ssafy.api.response.PinSearchGetRes;
import com.ssafy.api.service.MapsService;
import com.ssafy.api.service.ParticipantsService;
import com.ssafy.api.service.PinService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.*;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@Api(value = "Pin API", tags = {"Pin."})
@RestController
@RequestMapping("/api/pin")
public class PinController {
    @Autowired
    PinService pinService;

    @Autowired
    ParticipantsService participantsService;

    @Autowired
    MapsService mapService;

    @PostMapping()
    @ApiOperation(value = "Pin 등록", notes = "원하는 핀 정보를 등록한다")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공"),
            @ApiResponse(code = 401, message = "unauthenticated"),
            @ApiResponse(code = 403, message = "unauthorized")
    })
    public ResponseEntity<? extends BaseResponseBody> register(@ApiIgnore Authentication authentication,
            @RequestBody @ApiParam(value = "핀 등록 정보", required = true) PinRegisterPostReq registerInfo){
        int code = validateRequest(authentication, registerInfo.getMapSeq());
        switch(code){
            case 401:
                return ResponseEntity.status(401).body(BaseResponseBody.of(401, "unauthenticated"));
            case 403:
                return ResponseEntity.status(403).body(BaseResponseBody.of(403, "unauthorized"));
        }


        pinService.registerPin(registerInfo);

        return ResponseEntity.status(201).body(BaseResponseBody.of(201, "Success"));
    }

    @PatchMapping()
    @ApiOperation(value = "핀 정보 수정", notes = "원하는 핀의 정보를 수정한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "unauthenticated"),
            @ApiResponse(code = 403, message = "unauthorized")
    })
    public ResponseEntity<? extends BaseResponseBody> update(@ApiIgnore Authentication authentication, @RequestBody @ApiParam(value = "회원수정 정보", required = true) PinUpdatePatchReq updateInfo){
        int code = validateRequest(authentication, updateInfo.getMapSeq());
        switch(code){
            case 401:
                return ResponseEntity.status(401).body(BaseResponseBody.of(401, "unauthenticated"));
            case 403:
                return ResponseEntity.status(403).body(BaseResponseBody.of(403, "unauthorized"));
        }
        Pin pin = pinService.updatePin(updateInfo);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @DeleteMapping()
    @ApiOperation(value = "핀 정보 삭제", notes = "원하는 핀의 정보를 삭제한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "unauthenticated"),
            @ApiResponse(code = 403, message = "unauthorized")
    })
    public ResponseEntity<? extends BaseResponseBody> delete(@ApiIgnore Authentication authentication, @RequestParam Long pinSeq, @RequestParam(required = false) Long mapSeq) {
        int code = validateRequest(authentication, mapSeq);
        switch(code){
            case 401:
                return ResponseEntity.status(401).body(BaseResponseBody.of(401, "unauthenticated"));
            case 403:
                return ResponseEntity.status(403).body(BaseResponseBody.of(403, "unauthorized"));
        }
        pinService.deletePin(pinSeq);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @GetMapping
    @ApiOperation(value = "핀 정보 조회", notes = "원하는 핀 정보를 불러온다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 204, message = "내용 없음"),
            @ApiResponse(code = 403, message = "권한 없음"),
    })
    public ResponseEntity<? extends BaseResponseBody> searchPin(@ApiIgnore Authentication authentication, @RequestParam Long mapSeq){
        int code = validateRequest(authentication, mapSeq);
        switch(code){
            case 401:
                return ResponseEntity.status(401).body(BaseResponseBody.of(401, "unauthenticated"));
            case 403:
                return ResponseEntity.status(403).body(BaseResponseBody.of(403, "unauthorized"));
        }
        List<Pin> pinList = pinService.findByMapSeq(mapSeq);
        return ResponseEntity.status(code).body(PinSearchGetRes.of(code, "success", pinList));
    }

    private int validateRequest(Authentication authentication, Long mapSeq){
        if (authentication == null)
            return 401;
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        User user = userDetails.getUser();
        Maps map = mapService.findByMapSeq(mapSeq);
        if (map.getChannelSeq() != null && !participantsService.getParticipantsById(new ParticipantsId(user.getUserSeq(), map.getChannelSeq())).isPresent()) {
            return 403;
        }else if (map.getUserSeq() != user.getUserSeq()){
            return 403;
        }
        return 200;
    }
}
