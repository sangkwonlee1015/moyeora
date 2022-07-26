package com.ssafy.db.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@NoArgsConstructor
@Data
@Entity
@Table(name = "tb_participants")
public class Participants {
    @EmbeddedId
    private ParticipantsId participantsId;
}
