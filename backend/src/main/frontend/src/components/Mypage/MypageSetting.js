import "./Mypage.css";
import { CLICK_PIN, SET_PIN } from "../../redux/PinList";
import React, { useEffect, useState } from "react";
// mui
import Button from '@mui/material/Button';

// redux
import { useSelector } from "react-redux";
import UserInfo, { SET_USERINFO } from "../../redux/UserInfo";
import { useDispatch } from "react-redux";
import { stringify } from "uuid";
import { updateUser, updateUserPassword } from "../../api/user";



function MypageSetting(){
  const token = useSelector((state) => state.UserInfo.accessToken);
  const userInfo = useSelector((state) => state.UserInfo.userInfo);
  const userName = userInfo.userName
  const userNick = userInfo.userNick
  const userPhone = userInfo.userPhone


  const [newUserName, setNewUserName] = React.useState(userName);
  const [newUserNick, setNewUserNick] = React.useState(userNick);
  const [newUserPhone, setNewUserPhone] = React.useState(userPhone);

  const [currentPassword, setCurrentPassword] = React.useState();
  const [newPassword, setNewPassword] = React.useState();
  
  const onNewUserName = (event) => {
    setNewUserName(event.target.value)
  }
  const onNewUserNick = (event) => {
    setNewUserNick(event.target.value)
  }
  const onNewUserPhone = (event) => {
    setNewUserPhone(event.target.value)
  }

  const onCurrentPassword = (event) => {
    setCurrentPassword(event.target.value)
  }
  const onNewPassword = (event) => {
    setNewPassword(event.target.value)
  }

  const dispatch = useDispatch();

  const [onOff, setOnOff] = React.useState(false)

  const updateTry = () => {
    setOnOff((current) => !current);
    console.log("수정버튼 누름")
    // const userNick = UserInfo.userNick;
    console.log(userInfo);
    // console.log("유저이름:", userName)
    // console.log("유저닉네임:", userNick)
    // console.log("유저번호:", userPhone)
  }

  const onSubmit = () => {
    const updateUserInfo = {
      userName: newUserName,
      userNick: newUserNick,
      userPhone: newUserPhone,
    }

    const success = (res) => {
      console.log("유저정보변경 성공", res.data.userRes)
      dispatch(SET_USERINFO(res.data.userRes));
    }

    const error = (res) => {
      console.log("유저정보변경 실패", res)
    }

    updateUser(updateUserInfo, token, success, error)

  }

  const onSubmitPassword = () => {
    console.log("------------")
    console.log(token)
    const updateUserPasswordInfo = {
      currentPassword,
      newPassword,
    }
    console.log(updateUserPasswordInfo)
    const success = (res) => {
      console.log("비밀번호 변경 성공", res)

    }
    const error = (res) => {
      console.log("비밀번호 변경 실패", res)
    }
    updateUserPassword(updateUserPasswordInfo, token, success, error)
  }
  
  const logOut = () => {
    // dispatch.setLogOut()  유저인포안에
  }

  const test = () => {
    console.log(userInfo)
    console.log(userInfo.userRes.userName)
    console.log(userNick)
    console.log(userPhone)
  }
    return (
      
        <div className="mypage-setting"> 
          <div className="background"></div>
          <div className="big-circle"></div>
          <Button onClick={test}>테스트</Button>

          <div className="user-name"> {`이름 : ${userName} 입니다`}</div>
          <div className="background2">
            <div>사용자명</div>
            <div>이름: 
            <input defaultValue={userName} disabled={onOff === false} onChange={onNewUserName}></input>
            </div>
            <hr></hr>

            <div>사용자별명</div>
            <div>닉네임: 
            <input defaultValue={userNick} disabled={onOff === false} onChange={onNewUserNick}></input>
            </div>
            <hr></hr>


            <div> 전화번호 </div>
            <div> 전화번호:
            <input defaultValue={userPhone} disabled={onOff === false} onChange={onNewUserPhone}></input>
              <div className="button-update">
                <Button onClick={updateTry}>
                  <div className="button-text-color">
                    수정
                  </div>
                </Button>
              </div>
              {/* if (onOff) {} */}
              <div className="button-submit">
                <Button onClick={onSubmit}>
                  <div className="button-text-color">
                    제출
                  </div>
                </Button>
              </div>
            </div>
            <hr></hr>

            <div>
              현재 비밀번호
              <input onChange={onCurrentPassword}></input>
            </div>

            <div>새 비밀번호</div>
            <input onChange={onNewPassword}></input>
            <div className="button-submit">
            <Button onClick={onSubmitPassword}>
              <div className="button-text-color">제출</div>
            </Button>
            </div>
            

            <Button onClick={logOut}>로그아웃</Button>

          </div>
        </div>
    )
}

export default MypageSetting