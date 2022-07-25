package com.ssafy.api.service;

import com.ssafy.api.request.PinRegisterPostReq;
import com.ssafy.api.request.PinUpdatePatchReq;
import com.ssafy.db.entity.Pin;
import com.ssafy.db.repository.PinRepository;
import com.ssafy.db.repository.PinRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service("pinService")
public class PinServiceImpl implements PinService{

    @Autowired
    PinRepository pinRepository;

    @Autowired
    PinRepositorySupport pinRepositorySupport;

    @Override
    public Pin createPin(PinRegisterPostReq pinRegisterInfo) {
        Pin pin = new Pin();
        pin.setLat(pinRegisterInfo.getLat());
        pin.setLng(pinRegisterInfo.getLng());
        pin.setTime(pinRegisterInfo.getTime());
        pin.setUserId(pinRegisterInfo.getUserId());
        pin.setColor(pinRegisterInfo.getColor());
        pin.setContent(pinRegisterInfo.getContent());
        pin.setMapSeq(pinRegisterInfo.getMapSeq());
        return pinRepository.save(pin);
    }

    @Override
    public Pin getPinByPinSeq(Long pinSeq) {
        Optional<Pin> pin = pinRepository.findPinByPinSeq(pinSeq);
        if (!pin.isPresent()){
            return null;
        }else {
            return pin.get();
        }
    }

    @Override
    public Pin updatePin(PinUpdatePatchReq pinUpdateInfo) {
        Pin pin = pinRepository.findPinByPinSeq(pinUpdateInfo.getPinSeq()).get();
        pin.setColor(pinUpdateInfo.getColor());
        pin.setTime(pinUpdateInfo.getTime());
        pin.setContent(pinUpdateInfo.getContent());
        return pinRepository.save(pin);
    }

    @Override
    public void deletePin(Long pinSeq) {
        Pin pin = pinRepository.findPinByPinSeq(pinSeq).get();
        pinRepository.delete(pin);
    }
}
