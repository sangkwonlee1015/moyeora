package com.ssafy.db.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@Data
@Entity
@Table(name = "tb_maps")
public class Maps {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "map_seq")
    private Long mapSeq;
    private String title;
    private String lat;
    private String lng;
    @Column(name = "room_seq")
    private Long roomSeq;
}
