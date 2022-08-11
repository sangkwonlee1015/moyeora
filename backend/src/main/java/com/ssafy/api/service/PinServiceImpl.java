package com.ssafy.api.service;

import com.ssafy.api.request.PinRegisterPostReq;
import com.ssafy.api.request.PinUpdatePatchReq;
import com.ssafy.db.entity.Pin;
import com.ssafy.db.repository.PinRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service("pinService")
public class PinServiceImpl implements PinService{

    @Autowired
    PinRepository pinRepository;

    @Override
    public Pin registerPin(PinRegisterPostReq pinRegisterInfo, Long userSeq) {
        Pin pin = new Pin();
        pin.setPinContent(pinRegisterInfo.getPinTitle());
        pin.setPinLat(pinRegisterInfo.getPinLat());
        pin.setPinLng(pinRegisterInfo.getPinLng());
        pin.setPinColor(pinRegisterInfo.getPinColor());
        pin.setPinOrder(pinRegisterInfo.getPinOrder());
        pin.setMapSeq(pinRegisterInfo.getMapSeq());
        pin.setUserSeq(userSeq);
        return pinRepository.save(pin);
    }

    @Override
    public Pin updatePin(PinUpdatePatchReq pinUpdateInfo) {
        Pin pin = pinRepository.findByPinSeq(pinUpdateInfo.getPinSeq()).get();
        pin.setPinColor(pinUpdateInfo.getPinColor());
        pin.setPinContent(pinUpdateInfo.getPinContent());

        return pinRepository.save(pin);
    }

    @Override
    public void deletePin(Long pinSeq) {
        Pin pin = pinRepository.findByPinSeq(pinSeq).get();
        pinRepository.delete(pin);
    }

    @Override
    public List<Pin> findByMapSeq(Long mapSeq) {
        return pinRepository.findByMapSeq(mapSeq);
    }
}
