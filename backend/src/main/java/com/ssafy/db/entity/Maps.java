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
    private Long mapSeq;
    private String mapName;
    private Long userSeq;
    private Long channelSeq;

}
