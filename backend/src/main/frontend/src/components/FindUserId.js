import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Input, Modal, Slide, Stack, Typography } from "@mui/material"
import React from "react";
import { TransitionProps } from "@mui/material/transitions";
import { useEffect, useState } from "react";
import { findUserId } from "../api/user";


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>,
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function FindUserId (){

  const [findUserName, setFindUserName] = useState("");
  const [findUserPhone, setFindUserPhone] = useState("");
  const [foundUserId, setFoundUserId] = useState("");
  
  const onFindUserName = (event) => {
    setFindUserName(event.target.value)
  }
  const onFindUserPhone = (event) => {
    setFindUserPhone(event.target.value)
  }


  const [openFindUserId, setOpenFindUserId] = React.useState(false);
  const [openResponseUserId, setOpenResponseUserId] = React.useState(false);
  
  const handleOpenFindUserId = () => {
    setOpenFindUserId(true);
  }
  const handleCloseFindUserId = () => {
    setOpenFindUserId(false);
    setFindUserName("");
    setFindUserPhone("");    
  }

  const handleOpenResponseUserId = () => {
    setOpenResponseUserId(true);
  }
  const handleCloseResponseUserId = () => {
    setOpenResponseUserId(false);
    handleCloseFindUserId()
  }

  const onFindUserId = () => {
    const findUserIdInfo = {
      userName: userName,
      userPhone: userPhone,
    }
    const success = (res) => {
      handleOpenResponseUserId()
      setFoundUserId(res.data.userId);

    }
    const error = (res) => {
      console.log(res)
    }
    findUserId(findUserIdInfo, success, error)
  }

  return (
    <div class="pass">
      <div className="button-logout">
          <Button onClick={handleOpenFindUserId}>
            <div className="button-text-color">아이디 찾기</div>
          </Button>
      </div>

      <Dialog
        open={openFindUserId}
        TransitionComponent={Transition}
        keepMounted  //??
        onClose={handleCloseFindUserId}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="dialog-title">{"아이디를 잊으셨나요?"}</DialogTitle>
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

            <label for="userName" >이름</label>
            <div>
              <Input 
                value={findUserName} 
                id="userName"
                className="dialog-input"
                onChange={onFindUserName}
              ></Input>
            </div>
            <br/>

            <label for="userPhone" >전화번호</label>
            <div>
              <Input 
                value={findUserPhone} 
                id="userPhone"
                className="dialog-input"
                onChange={onFindUserPhone}
              ></Input>
            </div>
            <br/>

          </DialogContentText>
        </DialogContent>

        <DialogActions className="option-cell">
          <div className="cancel-button">
            <Button onClick={handleCloseFindUserId}>
              <div className="cancel-button-text">취소</div>
            </Button>
          </div>
          <div className="accept-button">
            <Button onClick={onFindUserId}>
              <div className="accept-button-text">완료</div>
            </Button>
          </div>
        </DialogActions>
      </Dialog>

      <Modal
          open={openResponseUserId}
          onClose={handleCloseResponseUserId}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={style}
            style={{ backgroundColor: "#202225", borderRadius: "10px" }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              color="white"
            >
              찾으시는 아이디는 {foundUserId} 입니다. 
              <Stack
                direction="row-reverse"
                alignItems="center"
                spacing={2}
                style={{ marginTop: "2rem" }}
              >
                <Button onClick={handleCloseResponseUserId}>확인</Button>
              </Stack>
            </Typography>
          </Box>
        </Modal>
    </div>
  )
}

export default FindUserId