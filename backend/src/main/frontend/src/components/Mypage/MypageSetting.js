import "./Mypage.css";
import { CLICK_PIN, SET_PIN } from "../../redux/PinList";
import React, { useEffect, useState } from "react";
// mui
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

// redux
import { useSelector } from "react-redux";
import UserInfo, { SET_USERINFO, SET_LOGOUT, SET_TOKEN } from "../../redux/UserInfo";
import { useDispatch } from "react-redux";
import { stringify } from "uuid";
import { updateUser, updateUserPassword } from "../../api/user";
import { Link } from "react-router-dom";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>,
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


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
  
  const [openChangePassword, setOpenChangePassword] = React.useState(false);


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
  const handleOpenChangePassword = () => {
    setOpenChangePassword(true);
  };
  const handleCloseChangePassword = () => {
    setOpenChangePassword(false);
    setCurrentPassword("")
    setNewPassword("")
  };

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
    dispatch(SET_LOGOUT());
    const updateUserInfo = {
      userName: null,
      userNick: null,
      userPhone: null,
    }
    dispatch(SET_USERINFO(updateUserInfo));
    dispatch(SET_TOKEN(null));
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

            <div className="button-submit">
            <Button onClick={handleOpenChangePassword}>
              <div className="button-text-color">비밀번호 변경하기</div>
            </Button>
            </div>

            <div className="button-logout">
              <Link to="/" style={{ textDecoration: 'none' }}>
                <Button onClick={logOut}>
                  <div className="button-text-color">로그아웃</div>
                </Button>
              </Link>
            </div>

            <Dialog
              open={openChangePassword}
              TransitionComponent={Transition}
              keepMounted  //??
              onClose={handleCloseChangePassword}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle className="dialog-title">{"비밀번호를 바꿔주세요"}</DialogTitle>
              <DialogContent className="dialog-content">
                <div>
                  현재 비밀번호와 새 비밀번호를 입력하세요.
                  <br />
                  <br />
                  <br />
                </div>
                <DialogContentText 
                  id="alert-dialog-slide-description"
                  className="dialog-content-text">

                  <label for="currentPassword">현재 비밀번호</label>
                  <div>
                    <Input value={currentPassword} id="currentPassword" onChange={onCurrentPassword}></Input>
                  </div>
                  <br/>

                  <label for="newPassword">새 비밀번호</label>
                  <div>
                    <Input value={newPassword} id="newPassword" onChange={onNewPassword}></Input>
                  </div>

                </DialogContentText>
              </DialogContent>
              <DialogActions className="option-cell">
                <div className="cancel-button">
                  <Button onClick={handleCloseChangePassword}>
                    <div className="cancel-button-text">취소</div>
                  </Button>
                </div>
                <div className="accept-button">
                  <Button onClick={onSubmitPassword}>
                    <div className="accept-button-text">완료</div>
                  </Button>
                </div>
              </DialogActions>
            </Dialog>


          </div>
        </div>
    )
}

export default MypageSetting