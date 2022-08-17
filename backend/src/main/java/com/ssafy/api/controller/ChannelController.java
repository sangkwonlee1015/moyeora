package com.ssafy.api.controller;

import com.ssafy.api.request.ChannelRegisterPostReq;
import com.ssafy.api.request.ChannelSessionOutReq;
import com.ssafy.api.request.ChannelUpdatePatchReq;
import com.ssafy.api.response.ChannelRegisterPostRes;
import com.ssafy.api.response.ChannelSearchGetRes;
import com.ssafy.api.response.GetChannelInfoRes;
import com.ssafy.api.response.GetTextListRes;
import com.ssafy.api.service.ChannelService;
import com.ssafy.api.service.FileDBService;
import com.ssafy.api.service.ParticipantsService;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.*;
import com.ssafy.db.repository.TextStorageRepository;
import io.openvidu.java.client.*;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import static com.ssafy.db.entity.QChannel.channel;

@Api(value = "채널 API", tags = {"Channel"})
@RestController
@RequestMapping("/api/channel")
public class ChannelController {
    @Autowired
    ChannelService channelService;

    @Autowired
    FileDBService fileDBService;

    @Autowired
    ParticipantsService participantsService;

    @Autowired
    TextStorageRepository textStorageRepository;

    @Autowired
    UserService userService;

    private OpenVidu openVidu;
    private Map<String, Session> mapSessions = new ConcurrentHashMap<>();
    private Map<String, Map<String, OpenViduRole>> mapSessionNamesTokens = new ConcurrentHashMap<>();
    private String OPENVIDU_URL;
    private String SECRET;

    public ChannelController(@Value("${openvidu.secret}") String secret, @Value("${openvidu.url}") String openviduUrl){
        this.SECRET = secret;
        this.OPENVIDU_URL = openviduUrl;
        this.openVidu = new OpenVidu(OPENVIDU_URL, SECRET);
    }

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
        List<ChannelSearchObj> searchList = new ArrayList<ChannelSearchObj>();
        channelList.forEach(channel -> {
            channel.setChannelPassword(channel.getChannelPassword() == null? "" : "password");
            ChannelSearchObj obj = new ChannelSearchObj();
            obj.setChannel(channel);
            obj.setParticipantsCount(participantsService.getParticipantsByChannelSeq(channel.getChannelSeq()).size());
            FileDB f = fileDBService.getFile(channel.getChannelImageId());
            if (f == null) {
                byte[] temp = new byte[1];
                obj.setUploadedImage(temp);
            }else
                obj.setUploadedImage(f.getData());
            obj.setUserNick(userService.findUserBySeq(channel.getUserSeq()).getUserNick());
            searchList.add(obj);
        });

        return ResponseEntity.status(200).body(ChannelSearchGetRes.of(200, "success", searchList));
    }

    @GetMapping("/{channelSeq}")
    public ResponseEntity<? extends BaseResponseBody> getChannelInfo(@ApiIgnore Authentication authentication, @PathVariable Long channelSeq){
        Channel channel = channelService.findByChannelSeq(channelSeq);


        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        User user = userDetails.getUser();
//        String serverData = "{\"serverData\": \"" + user.getUserSeq() + "\"}";
//        ConnectionProperties connectionProperties = new ConnectionProperties.Builder().type(ConnectionType.WEBRTC).data(serverData).role(OpenViduRole.PUBLISHER).build();


//        String sessionName = channel.getChannelSeq().toString();
//        String token;
//        if (this.mapSessions.get(sessionName) != null) {
//            // Session already exists
//            System.out.println("Existing session " + sessionName);
//            try {
//
//                // Generate a new Connection with the recently created connectionProperties
//                token = this.mapSessions.get(sessionName).createConnection(connectionProperties).getToken();
//
//                // Update our collection storing the new token
//                this.mapSessionNamesTokens.get(sessionName).put(token, OpenViduRole.PUBLISHER);
        FileDB f = fileDBService.getFile(channel.getChannelImageId());
        if (f == null){
            byte[] temp = new byte[0];
            return ResponseEntity.status(200).body(GetChannelInfoRes.of(200, "success", channel.getChannelName(), channel.getChannelDesc(), channel.getChannelTag(), temp, channel.getChannelPassword()));
        }else
            return ResponseEntity.status(200).body(GetChannelInfoRes.of(200, "success", channel.getChannelName(), channel.getChannelDesc(), channel.getChannelTag(), f.getData(), channel.getChannelPassword()));

//            } catch (OpenViduJavaClientException e1) {
//                // If internal error generate an error message and return it to client
//                return ResponseEntity.status(400).body(BaseResponseBody.of(400, e1.toString()));
//            } catch (OpenViduHttpException e2) {
//                if (404 == e2.getStatus()) {
//                    // Invalid sessionId (user left unexpectedly). Session object is not valid
//                    // anymore. Clean collections and continue as new session
//                    this.mapSessions.remove(sessionName);
//                    this.mapSessionNamesTokens.remove(sessionName);
//                }
//            }
//        }
//
//        // New session
//        System.out.println("New session " + sessionName);
//        try {
//
//            // Create a new OpenVidu Session
//            Session session = this.openVidu.createSession();
//            // Generate a new Connection with the recently created connectionProperties
//            token = session.createConnection(connectionProperties).getToken();
//
//            // Store the session and the token in our collections
//            this.mapSessions.put(sessionName, session);
//            this.mapSessionNamesTokens.put(sessionName, new ConcurrentHashMap<>());
//            this.mapSessionNamesTokens.get(sessionName).put(token, OpenViduRole.PUBLISHER);
//
//            return ResponseEntity.status(200).body(GetChannelInfoRes.of(200, "success", channel.getChannelName(), channel.getChannelDesc(), channel.getChannelTag(), token));
//
//        } catch (Exception e) {
//            // If error generate an error message and return it to client
//            return ResponseEntity.status(400).body(BaseResponseBody.of(400, e.toString()));
//        }
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

    @PostMapping(value = "/removeUser")
    public ResponseEntity<? extends BaseResponseBody> removeUser(@RequestBody ChannelSessionOutReq req) {
        String sessionName = req.getSessionName();
        String token = req.getToken();
        System.out.println("Removing user | {sessionName, token}=");

        // If the session exists
        if (this.mapSessions.get(sessionName) != null && this.mapSessionNamesTokens.get(sessionName) != null) {

            // If the token exists
            if (this.mapSessionNamesTokens.get(sessionName).remove(token) != null) {
                // User left the session
                if (this.mapSessionNamesTokens.get(sessionName).isEmpty()) {
                    // Last user left: session must be removed
                    this.mapSessions.remove(sessionName);
                }
                return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
            } else {
                System.out.println("Problems in the app server: the TOKEN wasn't valid");
                return ResponseEntity.status(400).body(BaseResponseBody.of(400, "token wasn't valid"));
            }

        } else {
            // The SESSION does not exist
            System.out.println("Problems in the app server: the SESSION does not exist");
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "session does not exist"));
        }
    }

    @GetMapping("/text/{channelSeq}")
    public ResponseEntity<? extends BaseResponseBody> getTextList(@ApiIgnore Authentication authentication, @PathVariable Long channelSeq) {
        if (authentication == null) return ResponseEntity.status(401).body(BaseResponseBody.of(401, "unauthenticated"));
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        User user = userDetails.getUser();

        ParticipantsId participantsId = new ParticipantsId(user.getUserSeq(), channelSeq);
        if (!participantsService.getParticipantsById(participantsId).isPresent())
            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "unauthorized"));

        List<Object[]> list = textStorageRepository.findTextInfoByChannelSeq(channelSeq);
        list.forEach((arr) -> {
            arr[3] = user.getUserSeq().equals(arr[3]);
        });

        return ResponseEntity.status(200).body(GetTextListRes.of(200, "success", list));
    }
}
