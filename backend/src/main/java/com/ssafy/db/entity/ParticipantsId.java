package com.ssafy.db.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Data
@Embeddable
public class ParticipantsId implements Serializable {
    @Column(name = "room_seq")
    private Long roomSeq;
    @Column(name = "user_id")
    private String userId;

    public ParticipantsId(){}

    public ParticipantsId(String userId, Long roomSeq) {
        this.userId = userId;
        this.roomSeq = roomSeq;
    }
}
