package com.ssafy.db.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@Data
@Entity
@Table(name = "tb_user")
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_seq")
    private Long userSeq = null;
    @Column(name = "user_id")
    private String userId;
    @Column(name = "user_email")
    private String password;
    private String phone;
    @Column(name = "user_name")
    private String userName;
    private String nickname;
}
