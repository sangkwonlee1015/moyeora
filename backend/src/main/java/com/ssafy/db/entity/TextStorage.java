package com.ssafy.db.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@Data
@Entity
@Table(name = "tb_textstorage")
public class TextStorage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long textSeq;
    private Long channelSeq;
    private String textContent;

    @ManyToOne(optional = false)
    @JoinColumn(name="userSeq")
    private User user;
}
