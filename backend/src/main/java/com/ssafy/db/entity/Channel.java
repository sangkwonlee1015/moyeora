package com.ssafy.db.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@NoArgsConstructor
@Data
@Entity
@Table(name = "tb_channel")
public class Channel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long channelSeq = null;
    @Column(nullable = false, name = "channel_name")
    @NotBlank
    private String channelName;
    @Column(name = "channel_desc")
    private String channelDesc;
    @Column(name = "channel_password")
    private String channelPassword;
    @Column(name = "channel_tag")
    private String channelTag;
    @Column(nullable = false, name = "user_seq")
    private Long userSeq;
}
