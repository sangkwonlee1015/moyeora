package com.ssafy.db.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@Data
@Entity
@Table(name = "tb_room")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_seq")
    private Long roomSeq;
    @Column(name = "room_name")
    private String roomName;
    @Column(name = "room_url")
    private String roomUrl;
    @Column(name = "user_id")
    private String userId;
}
