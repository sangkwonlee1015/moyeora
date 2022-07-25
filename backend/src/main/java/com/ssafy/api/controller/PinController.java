package com.ssafy.api.controller;

import com.ssafy.api.request.PinRegisterPostReq;
import com.ssafy.api.request.PinUpdatePatchReq;
import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.request.UserUpdatePatchReq;
import com.ssafy.api.service.PinService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Pin;
import com.ssafy.db.entity.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@Api(value = "인증 API", tags = {"Pin."})
@RestController
@RequestMapping("/api/v1/pin")
public class PinController {
    @Autowired
    PinService pinService;

    @PostMapping()
    public ResponseEntity<? extends BaseResponseBody> register(@ApiIgnore Authentication authentication,
            @RequestBody @ApiParam(value = "회원가입 정보", required = true) PinRegisterPostReq registerInfo){
        if (authentication == null){
            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "Access Denied"));
        }
        pinService.createPin(registerInfo);

        return ResponseEntity.status(201).body(BaseResponseBody.of(201, "Success"));
    }

    @PatchMapping()
    public ResponseEntity<? extends BaseResponseBody> update(@ApiIgnore Authentication authentication, @RequestBody @ApiParam(value = "회원수정 정보", required = true) PinUpdatePatchReq updateInfo){
        if (authentication == null){
            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "Access Denied"));
        }

        Pin pin = pinService.updatePin(updateInfo);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @DeleteMapping("/{pinSeq}")
    public ResponseEntity<? extends BaseResponseBody> delete(@ApiIgnore Authentication authentication, @PathVariable Long pinSeq) {
        if (authentication == null){
            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "Access Denied"));
        }

        pinService.deletePin(pinSeq);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }
}
