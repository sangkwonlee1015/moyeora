package com.ssafy.api.controller;

import com.ssafy.api.request.MapsCreatePostReq;
import com.ssafy.api.request.MapsUpdatePatchReq;
import com.ssafy.api.service.MapsService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Maps;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@Api(value = "지도 API", tags = {"Maps"})
@RestController
@RequestMapping("/api/v1/maps")
public class MapsController {
    @Autowired
    MapsService mapsService;

    @PostMapping()
    @ApiOperation(value = "지도 생성", notes = "새로운 지도를 만든다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
    })
    public ResponseEntity<? extends BaseResponseBody> create(@ApiIgnore Authentication authentication,
            @RequestBody @ApiParam(value="지도 생성 정보", required = true) MapsCreatePostReq mapsCreatePostReq) {
        if (authentication == null){
            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "Access Denied"));
        }

        mapsService.createMaps(mapsCreatePostReq);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @GetMapping("/{roomSeq}")
    @ApiOperation(value = "지도 리스트", notes = "해당하는 방의 지도 리스트를 응답한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
    })
    public ResponseEntity<List<Maps>> getMapsList(@ApiIgnore Authentication authentication,
                                                  @PathVariable Long roomSeq){
        if (authentication == null){
            return ResponseEntity.status(403).body(null);
        }
        List<Maps> mapsList = mapsService.getMapsByRoomSeq(roomSeq);

        return ResponseEntity.status(200).body(mapsList);
    }

    @PatchMapping()
    @ApiOperation(value = "지도 정보 수정", notes = "지도 정보를 수정한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
    })
    public ResponseEntity<? extends BaseResponseBody> update(@ApiIgnore Authentication authentication,
            @RequestBody @ApiParam(value="지도 수정 정보", required = true) MapsUpdatePatchReq mapsUpdatePatchReq) {
        if (authentication == null){
            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "Access Denied"));
        }

        mapsService.updateMaps(mapsUpdatePatchReq);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @DeleteMapping("/{mapsSeq}")
    @ApiOperation(value = "지도 삭제", notes = "지도를 삭제한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
    })
    public ResponseEntity<? extends BaseResponseBody> update(@ApiIgnore Authentication authentication,
                                                             @PathVariable Long mapsSeq) {
        if (authentication == null){
            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "Access Denied"));
        }

        mapsService.deleteMaps(mapsSeq);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }
}
