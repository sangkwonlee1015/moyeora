package com.ssafy.api.controller;

import com.ssafy.api.request.MapsCreatePostReq;
import com.ssafy.api.request.MapsUpdatePatchReq;
import com.ssafy.api.response.MapsCreatePostRes;
import com.ssafy.api.response.MapsListGetRes;
import com.ssafy.api.service.MapsService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Maps;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.ArrayList;
import java.util.List;

@Api(value = "지도 API", tags = {"Maps"})
@RestController
@RequestMapping("/api/maps")
public class MapsController {
    @Autowired
    MapsService mapsService;

    @PostMapping()
    @ApiOperation(value = "지도 생성", notes = "새로운 지도를 만든다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
    })
    public ResponseEntity<? extends BaseResponseBody> create(@ApiIgnore Authentication authentication,
            @Validated @RequestBody @ApiParam(value="지도 생성 정보", required = true) MapsCreatePostReq mapsCreatePostReq,
                                                             BindingResult bindingResult) {
        if (authentication == null){
            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "Access Denied"));
        }
        if (bindingResult.hasErrors())
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "Bad Request"));

        // UserSeq와 ChannelSeq 둘 중 하나만 들어와야 함
        boolean flag = false;
        if(mapsCreatePostReq.getUserSeq() > 0)
            flag = true;
        if(mapsCreatePostReq.getChannelSeq() > 0)
            flag ^= true;
        if (!flag)
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "Bad Request"));

        Maps maps = mapsService.createMaps(mapsCreatePostReq);

        return ResponseEntity.status(201).body(MapsCreatePostRes.of(201, "Success", maps.getMapSeq()));
    }

    @GetMapping("/{seq}")
    @ApiOperation(value = "지도 리스트", notes = "해당하는 방 또는 유저의 지도 리스트를 응답한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
    })
    public ResponseEntity<? extends BaseResponseBody> getMapsList(@ApiIgnore Authentication authentication,
                                                  @PathVariable Long seq,
                                                  @RequestParam(value="type", required = true) String type){
        if (authentication == null){
            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "Access Denied"));
        }

        List<Maps> mapsList = new ArrayList<>();
        if (type.equals("channel")) {
            mapsList = mapsService.getMapsByChannelSeq(seq);
        }
        else if (type.equals("user")) {
            mapsList = mapsService.getMapsByUserSeq(seq);
        }
        else{
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "Bad Request"));
        }

        return ResponseEntity.status(200).body(MapsListGetRes.of(200, "Success", mapsList));
    }

    @PatchMapping()
    @ApiOperation(value = "지도 정보 수정", notes = "지도 정보를 수정한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
    })
    public ResponseEntity<? extends BaseResponseBody> update(@ApiIgnore Authentication authentication,
            @Validated @RequestBody @ApiParam(value="지도 수정 정보", required = true) MapsUpdatePatchReq mapsUpdatePatchReq,
                                                             BindingResult bindingResult) {
        if (authentication == null){
            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "Access Denied"));
        }

        if (bindingResult.hasErrors())
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "Bad Request"));

        mapsService.updateMaps(mapsUpdatePatchReq);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @DeleteMapping("/{mapsSeq}")
    @ApiOperation(value = "지도 삭제", notes = "지도를 삭제한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
    })
    public ResponseEntity<? extends BaseResponseBody> delete(@ApiIgnore Authentication authentication,
                                                             @PathVariable Long mapsSeq) {
        if (authentication == null){
            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "Access Denied"));
        }

        mapsService.deleteMaps(mapsSeq);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }
}
