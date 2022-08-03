package com.ssafy.api.controller;

import com.ssafy.api.request.MapsCreatePostReq;
import com.ssafy.api.request.MapsUpdatePatchReq;
import com.ssafy.api.response.MapsCreatePostRes;
import com.ssafy.api.response.MapsSearchGetRes;
import com.ssafy.api.service.MapsService;
import com.ssafy.api.service.ParticipantsService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Maps;
import com.ssafy.db.entity.ParticipantsId;
import com.ssafy.db.entity.User;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@Api(value = "지도 API", tags = {"Maps"})
@RestController
@RequestMapping("/api/map")
public class MapsController {
    @Autowired
    MapsService mapsService;

    @Autowired
    ParticipantsService participantsService;

    @PostMapping()
    @ApiOperation(value = "지도 생성", notes = "새로운 지도를 만든다.")
    @ApiResponses({@ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "unauthenticated"), @ApiResponse(code = 403, message = "unauthorized")})
    public ResponseEntity<? extends BaseResponseBody> create(@ApiIgnore Authentication authentication, @RequestBody @ApiParam(value = "지도 생성 정보", required = true) MapsCreatePostReq mapsCreatePostReq) {
        int code = validateRequest(authentication, mapsCreatePostReq.getUserSeq(), mapsCreatePostReq.getChannelSeq());
        switch (code) {
            case 401:
                return ResponseEntity.status(code).body(BaseResponseBody.of(code, "unauthenticated"));
            case 403:
                return ResponseEntity.status(code).body(BaseResponseBody.of(code, "unauthorized"));
        }
        Maps map = mapsService.createMaps(mapsCreatePostReq);

        return ResponseEntity.status(200).body(MapsCreatePostRes.of(code, "success", map.getMapSeq()));
    }

    @GetMapping()
    @ApiOperation(value = "지도 리스트", notes = "적잘한 지도 리스트를 응답한다.")
    @ApiResponses({@ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "unauthenticated"), @ApiResponse(code = 403, message = "unauthorized")})
    public ResponseEntity<? extends BaseResponseBody> searchMaps(@ApiIgnore Authentication authentication, @RequestParam(required = false) Long userSeq, @RequestParam(required = false) Long channelSeq) {
        int code = validateRequest(authentication, userSeq, channelSeq);
        switch (code) {
            case 401:
                return ResponseEntity.status(code).body(BaseResponseBody.of(code, "unauthenticated"));
            case 403:
                return ResponseEntity.status(code).body(BaseResponseBody.of(code, "unauthorized"));
        }
        List<Maps> mapList = mapsService.findByChannelSeqOrUserSeq(channelSeq, userSeq);

        return ResponseEntity.status(code).body(MapsSearchGetRes.of(code, "success", mapList));
    }

    @PatchMapping()
    @ApiOperation(value = "지도 정보 수정", notes = "지도 정보를 수정한다.")
    @ApiResponses({@ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "unauthenticated"), @ApiResponse(code = 403, message = "unauthorized")})
    public ResponseEntity<? extends BaseResponseBody> update(@ApiIgnore Authentication authentication, @RequestBody @ApiParam(value = "지도 수정 정보", required = true) MapsUpdatePatchReq mapsUpdatePatchReq) {
        Maps map = mapsService.findByMapSeq(mapsUpdatePatchReq.getMapSeq());
        int code = validateRequest(authentication, map.getUserSeq(), map.getChannelSeq());
        switch (code) {
            case 401:
                return ResponseEntity.status(401).body(BaseResponseBody.of(401, "unauthenticated"));
            case 403:
                return ResponseEntity.status(403).body(BaseResponseBody.of(403, "unauthorized"));
        }

        mapsService.updateMaps(mapsUpdatePatchReq);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @DeleteMapping("/{mapSeq}")
    @ApiOperation(value = "지도 삭제", notes = "지도를 삭제한다.")
    @ApiResponses({@ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "unauthenticated"), @ApiResponse(code = 403, message = "unauthorized")})
    public ResponseEntity<? extends BaseResponseBody> update(@ApiIgnore Authentication authentication, @PathVariable Long mapSeq) {
        Maps map = mapsService.findByMapSeq(mapSeq);
        int code = validateRequest(authentication, map.getUserSeq(), map.getChannelSeq());
        switch (code) {
            case 401:
                return ResponseEntity.status(code).body(BaseResponseBody.of(code, "unauthenticated"));
            case 403:
                return ResponseEntity.status(code).body(BaseResponseBody.of(code, "unauthorized"));
        }

        mapsService.deleteMaps(mapSeq);

        return ResponseEntity.status(code).body(BaseResponseBody.of(code, "Success"));
    }

    private int validateRequest(Authentication authentication, Long userSeq, Long channelSeq) {
        if (authentication == null) return 401;
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        User user = userDetails.getUser();
        if (userSeq != null && user.getUserSeq() != userSeq) {
            return 403;
        } else if (channelSeq != null && !participantsService.getParticipantsById(new ParticipantsId(user.getUserSeq(), channelSeq)).isPresent()) {
            return 403;
        }
        return 200;
    }
}
