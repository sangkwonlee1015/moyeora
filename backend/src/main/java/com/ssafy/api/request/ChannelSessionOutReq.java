package com.ssafy.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChannelSessionOutReq {
    private String sessionName;
    private String token;
}
