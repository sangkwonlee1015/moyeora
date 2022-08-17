package com.ssafy.db.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Data
@Embeddable
public class ParticipantsId implements Serializable {
    @Column(name = "channel_seq")
    private Long channelSeq;
    @Column(name = "user_seq")
    private Long userSeq;

    public ParticipantsId(){}

    public ParticipantsId(Long userSeq, Long channelSeq) {
        this.userSeq = userSeq;
        this.channelSeq = channelSeq;
    }
}
