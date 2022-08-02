package com.ssafy.api.controller;

import com.ssafy.api.request.UserUpdatePatchReq;
import com.ssafy.api.response.UserMeGetRes;
import com.ssafy.common.auth.SsafyUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.ssafy.api.request.UserLoginPostReq;
import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.response.UserLoginPostRes;
import com.ssafy.api.response.UserRes;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.common.util.JwtTokenUtil;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserRepositorySupport;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import springfox.documentation.annotations.ApiIgnore;

import javax.xml.ws.Response;

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "유저 API", tags = {"User"})
@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    SsafyUserDetailService detailService;

    @PostMapping()
    @ApiOperation(value = "회원 가입", notes = "<strong>아이디와 패스워드</strong>를 통해 회원가입 한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> register(
            @RequestBody @ApiParam(value = "회원가입 정보", required = true) UserRegisterPostReq registerInfo) {

        //임의로 리턴된 User 인스턴스. 현재 코드는 회원 가입 성공 여부만 판단하기 때문에 굳이 Insert 된 유저 정보를 응답하지 않음.
        User user = userService.createUser(registerInfo);

        return ResponseEntity.status(201).body(BaseResponseBody.of(201, "Success"));
    }

    @GetMapping("/me")
    @ApiOperation(value = "회원 본인 정보 조회", notes = "로그인한 회원 본인의 정보를 응답한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 403, message = "권한 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> getUserInfo(@ApiIgnore Authentication authentication) {
        /**
         * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저 식별.
         * 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access Denied"}) 발생.
         */
        if (authentication == null){
            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "Access Denied"));
        }
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);

        return ResponseEntity.status(200).body(UserMeGetRes.of(200, "Success", UserRes.of(user)));
    }

    @GetMapping("/{userId}")
    @ApiOperation(value = "사용자 아이디 중복 체크", notes = "사용자 아이디의 사용 가능 여부를 응답한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "사용 가능"),
            @ApiResponse(code = 409, message = "아이디 중복"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> checkOverlappedUserid(@PathVariable String userId) {
        User user = userService.getUserByUserId(userId);
        if (user != null) {
            return ResponseEntity.status(409).body(BaseResponseBody.of(409, "이미 존재하는 사용자 ID입니다."));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "사용 가능한 사용자 ID입니다."));
    }

    @PatchMapping("/{userId}")
    @ApiOperation(value = "회원 정보 수정", notes = "회원 정보를 수정한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 403, message = "권한 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> update(@ApiIgnore Authentication authentication, @PathVariable String userId, @RequestBody @ApiParam(value = "회원수정 정보", required = true) UserUpdatePatchReq updateInfo) {
        if (authentication == null){
            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "Access Denied"));
        }

        User user = userService.updateUser(userId, updateInfo);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @DeleteMapping("/{userId}")
    @ApiOperation(value = "회원 정보 삭제", notes = "회원 정보를 삭제한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 403, message = "권한 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> delete(@ApiIgnore Authentication authentication, @PathVariable String userId) {
        if (authentication == null){
            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "Access Denied"));
        }

        userService.deleteUser(userId);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }
}