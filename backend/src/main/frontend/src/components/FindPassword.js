import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Input, Slide } from "@mui/material"
import React from "react";
import { TransitionProps } from "@mui/material/transitions";
import { useEffect, useState } from "react";
import { findUserPassword } from "../api/user";


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>,
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function FindPassword (){

  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const onUserId = (event) => {
    setUserId(event.target.value)
  }
  const onUserName = (event) => {
    setUserName(event.target.value)
  }
  const onUserPhone = (event) => {
    setUserPhone(event.target.value)
  }
  const onNewPassword = (event) => {
    setNewPassword(event.target.value)
  }



  const [openFindPassword, setOpenFindPassword] = React.useState(false);

  const handleOpenFindPassword = () => {
    setOpenFindPassword(true);
  }
  const handleCloseFindPassword = () => {
    setOpenFindPassword(false);
    setUserId("");
    setUserName("");
    setUserPhone("");
    setNewPassword("");
    
  }

  const test = () => {
    const findUserPasswordInfo = {
      userId: userId,
      userName: userName,
      userPhone: userPhone,
      newPassword: newPassword,
    }
    const success = (res) => {
      console.log(res)
      handleCloseFindPassword()
    }
    const error = (res) => {
      console.log(res)
    }
    findUserPassword(findUserPasswordInfo, success, error)
  }

  return (
    <div>
      <div className="button-logout">
          <Button onClick={handleOpenFindPassword}>
            <div className="button-text-color">비밀번호 찾기</div>
          </Button>
      </div>

      <Dialog
        open={openFindPassword}
        TransitionComponent={Transition}
        keepMounted  //??
        onClose={handleCloseFindPassword}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="dialog-title">{"비밀번호를 잊으셨나요?"}</DialogTitle>
        <DialogContent className="dialog-content">
          <div>
            아래의 정보를 입력하세요.
            <br />
            <br />
            <br />
          </div>
          <DialogContentText 
            id="alert-dialog-slide-description"
            className="dialog-content-text">
            <label for="userId" >아이디</label>
            <div>
              <Input 
                value={userId} 
                id="userId"
                className="dialog-input"
                onChange={onUserId}
              ></Input>
            </div>
            <br/>

            <label for="userName" >이름</label>
            <div>
              <Input 
                value={userName} 
                id="userName"
                className="dialog-input"
                onChange={onUserName}
              ></Input>
            </div>
            <br/>

            <label for="userPhone" >전화번호</label>
            <div>
              <Input 
                value={userPhone} 
                id="userPhone"
                className="dialog-input"
                onChange={onUserPhone}
              ></Input>
            </div>
            <br/>

            <label for="newPassword">새 비밀번호</label>
            <div>
              <Input
                value={newPassword}
                id="newPassword"
                className="dialog-input"
                onChange={onNewPassword}
                ></Input>
            </div>
          </DialogContentText>
        </DialogContent>

        <DialogActions className="option-cell">
          <div className="cancel-button">
            <Button onClick={handleCloseFindPassword}>
              <div className="cancel-button-text">취소</div>
            </Button>
          </div>
          <div className="accept-button">
            <Button onClick={test}>
              <div className="accept-button-text">완료</div>
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default FindPassword