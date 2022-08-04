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
    @Column(name = "pin_content")
    private String pinContent;
    @Column(name = "pin_lat")
    private String pinLat;
    @Column(name = "pin_lng")
    private String pinLng;
    @Column(name = "pin_color")
    private String pinColor;
    @Column(name = "pin_order")
    private Integer pinOrder;
    @Column(name = "user_seq")
    private Long userSeq;
    @Column(name = "map_seq")
    private Long mapSeq;
}
