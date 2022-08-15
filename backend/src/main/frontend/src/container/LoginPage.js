import React, { useState } from "react";
import { registerUser, getUserProfile, findUserPassword } from "../api/user";
import { findUserId } from "../api/user";

import { doLogin } from "../api/auth";
import { useDispatch } from "react-redux";
import { SET_LOGIN, SET_TOKEN, SET_USERINFO } from "../redux/UserInfo";
import { getParticipantListByUser } from "../api/participant";
import { getChannelInfo } from "../api/channel";
import { SET_CHANNELLIST } from "../redux/ChannelList";
import "./LoginSignup.css";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Input, Modal, Slide, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";


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

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>,
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const LoginPage = () => {
  //const navigate= useNavigate();
  const dispatch = useDispatch();
  const [IsSignUp, setIsSignUp] = useState(false);
  const [userId, setUserId] = useState("");
  const [userPass, setUserPass] = useState("");
  const [userName, setUserName] = useState("");
  const [userNick, setUserNick] = useState("");
  const [userPhone, setUserPhone] = useState("");

  const LoginOrSignUp = (e) => {        // 로그인 창 -> 회원가입 창 왔다갔다.
    e.preventDefault()                  // form 제출 막고
    setUserId("")                       // id, password 입력하던거 초기화
    setUserPass("")
    setUserName("")
    setUserNick("")
    setUserPhone("")
    const newValue = !IsSignUp          
    setIsSignUp(newValue)               // true -> false 변경
  }

  const onSubmitRegisterForm = (event) => {
    event.preventDefault();
    const data = {
      userId: userId,
      userPassword: userPass,
      userName: userName,
      userNick: userNick,
      userPhone: userPhone
    };
    registerUser(
      data,
      (response) => {
        setUserId("");                        // id, password 입력하던거 초기화
        setUserPass("");
        setUserName("");
        setUserNick("");
        setUserPhone("");
        setIsSignUp(false)
      },
      (error) => {
        console.log(error);
      }
    );
  };
  const onSubmitLoginForm = (event) => {
    event.preventDefault();
    doLogin(
      { userId: userId, userPassword: userPass },
      (response) => {
        console.log(response.data);
        dispatch(SET_TOKEN(response.data.accessToken));
        let token = response.data.accessToken;
        getUserProfile(
          response.data.accessToken,
          (response) => {
            dispatch(SET_USERINFO(response.data.userRes));
            console.log("profile get", response.data.userRes);
            let list = [];
            getParticipantListByUser(
              token,
              (response) => {
                dispatch(SET_CHANNELLIST(list))
                response.data.list.map((participant) => {
                  console.log(participant);
                  getChannelInfo(
                    participant.participantsId.channelSeq,
                    token,
                    ({ data }) => {
                      let channel = {
                        channelSeq: participant.participantsId.channelSeq,
                        channelDesc: data.channelDesc,
                        channelName: data.channelName,
                        channelTag: data.channelTag,
                      };
                      list = list.concat(channel);
                      dispatch(SET_CHANNELLIST(list));
                    },
                    (error) => {
                      console.log("error", error);
                    }
                  );
                });
              },
              (error) => {
                console.log(error);
              }
            );
          },
          (error) => {
            console.log(error);
          }
        );
        dispatch(SET_LOGIN());
      },
      (error) => {
        console.log(error);
      }
    );
  };
  // 로그인 끝 //
  // 아이디 찾기 시작 //
  const [findUserName, setFindUserName] = useState("");
  const [findUserPhone, setFindUserPhone] = useState("");
  const [foundUserId, setFoundUserId] = useState("");
  const onFindUserName = (event) => {
    setFindUserName(event.target.value)
  }
  const onFindUserPhone = (event) => {
    setFindUserPhone(event.target.value)
  }
  const [openFindUserId, setOpenFindUserId] = useState(false);
  const [openResponseUserId, setOpenResponseUserId] = useState(false);
  
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
      userName: findUserName,
      userPhone: findUserPhone,
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
  // 아이디 찾기 끝 //
  // 비밀번호 찾기 시작 //
  const [passUserId, setPassUserId] = useState("");
  const [passUserName, setPassUserName] = useState("");
  const [passUserPhone, setPassUserPhone] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const onPassUserId = (event) => {
    setPassUserId(event.target.value)
  }
  const onPassUserName = (event) => {
    setPassUserName(event.target.value)
  }
  const onPassUserPhone = (event) => {
    setPassUserPhone(event.target.value)
  }
  const onNewPassword = (event) => {
    setNewPassword(event.target.value)
  }

  const [openFindPassword, setOpenFindPassword] = React.useState(false);
  const [openResponseFindPassword, setOpenResponseFindPassword] = useState(false);

  const handleOpenFindPassword = () => {
    setOpenFindPassword(true);
  }
  const handleCloseFindPassword = () => {
    setOpenFindPassword(false);
    setPassUserId("");
    setPassUserName("");
    setPassUserPhone("");
    setNewPassword("");
  }
  const handleOpenResponseFindPassword = () => {
    setOpenResponseFindPassword(true);
  }
  const handleCloseResponseFindPassword = () => {
    setOpenResponseFindPassword(false);
    handleCloseFindPassword()
  }

  const onFindPassword = () => {
    const findUserPasswordInfo = {
      userId: passUserId,
      userName: passUserName,
      userPhone: passUserPhone,
      newPassword: newPassword,
    }
    const success = (res) => {
      console.log(res)
      handleOpenResponseFindPassword()
    }
    const error = (res) => {
      console.log(res)
    }
    findUserPassword(findUserPasswordInfo, success, error)
  }

  return (
    <div className="LoginSignUp">
      { IsSignUp ? 
      <div class="center">
        <h1>SignUp</h1>
        <form method="post" onSubmit={onSubmitRegisterForm}>
          <div class="txt_field">
            <input 
            type="text" 
            required
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            ></input>
            <span></span>
            <label>User ID</label>
          </div>
          <div class="txt_field">
            <input 
            type="password" 
            required
            value={userPass}
            onChange={(e) => setUserPass(e.target.value)}
            ></input>
            <span></span>
            <label>Password</label>
          </div>
          <div class="txt_field">
            <input 
            type="text" 
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            ></input>
            <span></span>
            <label>YourName</label>
          </div>
          <div class="txt_field">
            <input 
            type="text" 
            value={userNick}
            required
            onChange={(e) => setUserNick(e.target.value)}
            ></input>
            <span></span>
            <label>NickName</label>
          </div>
          <div class="txt_field">
            <input 
            type="text" 
            required
            value={userPhone}
            onChange={(e) => setUserPhone(e.target.value)}
            ></input>
            <span></span>
            <label>PhoneNumber</label>
          </div>
          <input type="submit" value="SignUp"></input>
          <div class="signup_link">
            already a member? <span className="LoginOrout" onClick={LoginOrSignUp}>Login</span>
          </div>
        </form>
      </div>
      :
      <div class="center">
        <h1>Login</h1>
        <form method="post" onSubmit={onSubmitLoginForm}>
          <div class="txt_field">
            <input 
            type="text" 
            required
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            // placeholder="Password"
            ></input>
            <span></span>
            <label>User ID</label>
          </div>
          <div class="txt_field">
            <input 
            type="password" 
            required
            value={userPass}
            onChange={(e) => setUserPass(e.target.value)}
            ></input>
            <span></span>
            <label>Password</label>
          </div>
          <div style={{display: "flex" , justifyContent: "space-between"}}>
            <div class="pass" onClick={handleOpenFindUserId}>Forgot Id?</div>
            <div class="pass password" onClick={handleOpenFindPassword}>Forgot Password?</div>
          </div>
          <input type="submit" value="Login"></input>
          <div class="signup_link">
            Not a member? <span className="LoginOrout" onClick={LoginOrSignUp}>Signup</span>
          </div>
        </form>
      </div>
      }
{/* 로그인 끝 */}
{/* 아이디 찾기 시작 */}
      
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
{/* 아이디 찾기 끝 */}
{/* 비밀번호 찾기 시작 */}
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
                value={passUserId} 
                id="userId"
                className="dialog-input"
                onChange={onPassUserId}
              ></Input>
            </div>
            <br/>

            <label for="userName" >이름</label>
            <div>
              <Input 
                value={passUserName} 
                id="userName"
                className="dialog-input"
                onChange={onPassUserName}
              ></Input>
            </div>
            <br/>

            <label for="userPhone" >전화번호</label>
            <div>
              <Input 
                value={passUserPhone} 
                id="userPhone"
                className="dialog-input"
                onChange={onPassUserPhone}
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
            <Button onClick={onFindPassword}>
              <div className="accept-button-text">완료</div>
            </Button>
          </div>
        </DialogActions>
      </Dialog>

      <Modal
          open={openResponseFindPassword}
          onClose={handleCloseResponseFindPassword}
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
              비밀번호가 변경되었습니다.
              <Stack
                direction="row-reverse"
                alignItems="center"
                spacing={2}
                style={{ marginTop: "2rem" }}
              >
                <Button onClick={handleCloseResponseFindPassword}>확인</Button>
              </Stack>
            </Typography>
          </Box>
        </Modal>
    </div>
  );
};

export default LoginPage;
