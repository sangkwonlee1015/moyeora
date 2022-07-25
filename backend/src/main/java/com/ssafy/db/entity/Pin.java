package com.ssafy.db.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@NoArgsConstructor
@Data
@Entity
@Table(name = "tb_pin")
public class Pin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pin_seq")
    private Long pinSeq = null;
    private String lat;
    private String lng;
    private LocalDateTime time;
    private String content;
    private Integer color;
    @Column(name = "map_seq")
    private Long mapSeq;
    @Column(name = "user_id")
    private String userId;
}
