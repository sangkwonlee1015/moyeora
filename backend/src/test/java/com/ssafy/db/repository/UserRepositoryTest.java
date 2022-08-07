package com.ssafy.db.repository;

import com.ssafy.db.entity.User;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

@SpringBootTest
class UserRepositoryTest {
    @Autowired
    UserRepository userRepository;

    @Test
    public void testing(){
        User user = new User();
        user.setUserId("userId1");
        user.setUserPassword("hello12345");
        user.setUserPhone("01075591248");
        user.setUserNick("didnlie");
        user.setUserName("윤경식");

        userRepository.save(user);
        Optional<User> foundUser = userRepository.findByUserId("userId1");
        Assertions.assertThat(foundUser).isNotNull();
    }
}