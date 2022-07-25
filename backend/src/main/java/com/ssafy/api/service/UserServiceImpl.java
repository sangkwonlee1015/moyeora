package com.ssafy.api.service;

import com.ssafy.api.request.UserUpdatePatchReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserRepository;
import com.ssafy.db.repository.UserRepositorySupport;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("userService")
public class UserServiceImpl implements UserService {
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	UserRepositorySupport userRepositorySupport;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Override
	public User createUser(UserRegisterPostReq userRegisterInfo) {
		User user = new User();
		user.setUserId(userRegisterInfo.getUserId());
		// 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
		user.setPassword(passwordEncoder.encode(userRegisterInfo.getPassword()));
		user.setUserName(userRegisterInfo.getUserName());
		user.setNickname(userRegisterInfo.getNickname());
		return userRepository.save(user);
	}

	@Override
	public User getUserByUserId(String userId) {
		// 디비에 유저 정보 조회 (userId 를 통한 조회).
		User user = userRepositorySupport.findUserByUserId(userId).orElse(null);
		return user;
	}

	public User updateUser(String userId, UserUpdatePatchReq userUpdateInfo){
		User user = getUserByUserId(userId);
		// 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
		user.setPassword(passwordEncoder.encode(userUpdateInfo.getPassword()));
		user.setUserName(userUpdateInfo.getUserName());
		user.setNickname(userUpdateInfo.getNickname());
		user.setPhone(userUpdateInfo.getPhone());
		return userRepository.save(user);
	}

	public void deleteUser(String userId){
		User user = getUserByUserId(userId);
		userRepository.delete(user);
	}
}
