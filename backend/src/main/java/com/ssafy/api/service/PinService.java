package com.ssafy.api.service;

import com.ssafy.api.request.PinRegisterPostReq;
import com.ssafy.api.request.PinUpdatePatchReq;
import com.ssafy.db.entity.Pin;

public interface PinService {
    Pin createPin(PinRegisterPostReq pinRegisterInfo);
    Pin getPinByPinSeq(Long pinSeq);
    Pin updatePin(PinUpdatePatchReq pinUpdateInfo);
    void deletePin(Long pinSeq);
}
