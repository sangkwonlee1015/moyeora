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
import TextField from "@mui/material/TextField";

// redux
import { useSelector } from "react-redux";
import UserInfo, {
  SET_USERINFO,
  SET_LOGOUT,
  SET_TOKEN,
} from "../../redux/UserInfo";
import { useDispatch } from "react-redux";
import { stringify } from "uuid";
import { deleteUser, updateUser, updateUserPassword } from "../../api/user";
import { Link } from "react-router-dom";
import {
  deleteParticipant,
  getParticipantListByUser,
} from "../../api/participant";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>,
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function MypageSetting({ open, setOpen }) {
  const token = useSelector((state) => state.UserInfo.accessToken);
  const userInfo = useSelector((state) => state.UserInfo.userInfo);
  const userName = userInfo.userName;
  const userNick = userInfo.userNick;
  const userPhone = userInfo.userPhone;

  const [newUserName, setNewUserName] = React.useState(userName);
  const [newUserNick, setNewUserNick] = React.useState(userNick);
  const [newUserPhone, setNewUserPhone] = React.useState(userPhone);

  const [currentPassword, setCurrentPassword] = React.useState();
  const [newPassword, setNewPassword] = React.useState();

  const [openChangePassword, setOpenChangePassword] = React.useState(false);
  const [openDeleteUser, setOpenDeleteUser] = React.useState(false);

  const onNewUserName = (event) => {
    setNewUserName(event.target.value);
  };
  const onNewUserNick = (event) => {
    setNewUserNick(event.target.value);
  };
  const onNewUserPhone = (event) => {
    setNewUserPhone(event.target.value);
  };

  const onCurrentPassword = (event) => {
    setCurrentPassword(event.target.value);
  };
  const onNewPassword = (event) => {
    setNewPassword(event.target.value);
  };
  const handleOpenChangePassword = () => {
    setOpenChangePassword(true);
  };
  const handleCloseChangePassword = () => {
    setOpenChangePassword(false);
    setCurrentPassword("");
    setNewPassword("");
  };

  const handleOpenDeleteUser = () => {
    setOpenDeleteUser(true);
  };
  const handleCloseDeleteUser = () => {
    setOpenDeleteUser(false);
  };

  const dispatch = useDispatch();

  const [onOff, setOnOff] = React.useState(false);

  const updateTry = () => {
    setOnOff((current) => !current);
    console.log("???????????? ??????");
    console.log(userInfo);
  };

  const onSubmit = () => {
    const updateUserInfo = {
      userName: newUserName,
      userNick: newUserNick,
      userPhone: newUserPhone,
    };

    const success = (res) => {
      console.log("?????????????????? ??????", res.data.userRes);
      dispatch(SET_USERINFO(res.data.userRes));
      alert("????????? ????????? ?????????????????????.")
      handleClose(false)
    };

    const error = (res) => {
      console.log("?????????????????? ??????", res);
      alert("????????? ?????? ????????? ??????????????????.")

    };

    updateUser(updateUserInfo, token, success, error);
  };

  const onSubmitPassword = () => {
    console.log(token);
    const updateUserPasswordInfo = {
      currentPassword,
      newPassword,
    };
    console.log(updateUserPasswordInfo);
    const success = (res) => {
      console.log("???????????? ?????? ??????", res);
      alert("??????????????? ?????????????????????.");
      handleClose();
      handleCloseChangePassword();
    };
    <Link to="/"></Link>;
    const error = (res) => {
      console.log("???????????? ?????? ??????", res);
      alert(res.response.data.message);
    };
    updateUserPassword(updateUserPasswordInfo, token, success, error);
  };

  const logOut = () => {
    dispatch(SET_LOGOUT());
    const updateUserInfo = {
      userName: null,
      userNick: null,
      userPhone: null,
    };
    dispatch(SET_USERINFO(updateUserInfo));
    dispatch(SET_TOKEN(null));
  };

  const onDeleteUser = () => {
    const success2 = (res2) => {
      console.log("???????????? ????????????", res2.data.list);
      const listHaveToDelete = res2.data.list;
      const success1 = (res1) => {
        console.log("tb_participants ?????? ?????? ??????", res1);
      };
      const error1 = (res1) => {
        console.log("tb_participants ?????? ?????? ??????", res1);
      };
      for (const item of listHaveToDelete) {
        console.log(item.participantsId.channelSeq);
        deleteParticipant(
          item.participantsId.channelSeq,
          token,
          success1,
          error1
        );
      }

      const success3 = (res3) => {
        dispatch(SET_LOGOUT());
        const updateUserInfo = {
          userName: null,
          userNick: null,
          userPhone: null,
        };
        dispatch(SET_USERINFO(updateUserInfo));
        dispatch(SET_TOKEN(null));
        handleCloseDeleteUser(false);
        console.log("???????????? ??????", res3);
      };
      const error3 = (res3) => {
        console.log("???????????? ??????", res3);
      };
      deleteUser(token, success3, error3);
    };

    const error2 = (res2) => {
      console.log("???????????? ????????????", res2);
    };

    getParticipantListByUser(token, success2, error2);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        // TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        className="dialog"
      >
        <DialogTitle className="dialog-title">????????? ?????? ??????</DialogTitle>
        <DialogContent className="dialog-content">
          <DialogContentText
            id="alert-dialog-slide-description"
            className="dialog-content-text"
          >
            <div className="dialog-change-userinfo-input">
              <label for="userName" className="input-label">
                ??????
              </label>
              <br />
              <br />
              <input
                sx={{ width: "535px" }}
                value={newUserName}
                id="userName"
                className="input"
                onChange={onNewUserName}
                defaultValue={userName} 
              ></input>
              <br />
              <br />
              <label for="userNick" className="input-label">
                ?????????
              </label>
              <br />
              <br />
              <input
                sx={{ width: "535px" }}
                value={newUserNick}
                id="userNick"
                className="input"
                onChange={onNewUserNick}
                defaultValue={userNick} 
              ></input>
              {/* <Input
                value={channelDesc}
                id="channelDesc"
                className="input"
                onChange={onChannelDesc}
              ></Input> */}
              <br />
              <br />
              <label for="userPhone" className="input-label">
                ????????????
              </label>
              <br />
              <br />
              <input
                sx={{ width: "535px" }}
                value={newUserPhone}
                id="userPhone"
                className="input"
                onChange={onNewUserPhone}
                defaultValue={userPhone} 
              ></input>
              <br />
            </div>
            <br />
            <div style={{ display: "flex"}}>
              <div className="button-submit">
                <Button onClick={handleOpenChangePassword}>
                  <div className="button-text-color">???????????? ????????????</div>
                </Button>
              </div>
              <div className="button-logout">
                <Button onClick={handleOpenDeleteUser}>
                  <div className="button-text-color">?????? ????????????</div>
                </Button>
              </div>
              <div className="button-logout">
                <Link to="/" style={{ textDecoration: "none" }}>
                  <Button onClick={logOut}>
                    <div className="button-text-color">????????????</div>
                  </Button>
                </Link>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions className="option-cell">
          <div className="cancel-button">
            <Button onClick={handleClose}>
              <div className="cancel-button-text">CANCEL</div>
            </Button>
          </div>
          <div className="accept-button">
            <Button onClick={onSubmit}>
              <div className="accept-button-text">ACCEPT</div>
            </Button>
          </div>
          
        </DialogActions>
      </Dialog>
      <Dialog
        open={openChangePassword}
        TransitionComponent={Transition}
        keepMounted //??
        onClose={handleCloseChangePassword}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="dialog-title">
          {"??????????????? ???????????????"}
        </DialogTitle>
        <DialogContent className="dialog-content">
          <div>
            ?????? ??????????????? ??? ??????????????? ???????????????.
            <br />
            <br />
            <br />
          </div>
          <DialogContentText
            id="alert-dialog-slide-description"
            className="dialog-content-text"
          >
            <label for="currentPassword">?????? ????????????</label>
            <div>
              <Input
                value={currentPassword}
                id="currentPassword"
                className="dialog-input"
                onChange={onCurrentPassword}
              ></Input>
            </div>
            <br />

            <label for="newPassword">??? ????????????</label>
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
            <Button onClick={handleCloseChangePassword}>
              <div className="cancel-button-text">??????</div>
            </Button>
          </div>
          <div className="accept-button">
            <Button onClick={onSubmitPassword}>
              <div className="accept-button-text">??????</div>
            </Button>
          </div>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDeleteUser}
        TransitionComponent={Transition}
        keepMounted //??
        onClose={handleCloseDeleteUser}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="dialog-title">{"?????? ????????????"}</DialogTitle>
        <DialogContent className="dialog-content">
          <div>
            ????????? ????????? ?????????????????????? ?????? ???????????? ?????????????????? ?????? ?????????
            ?????? ??? ?????????.
            <br />
            <br />
            <br />
          </div>
          <DialogContentText
            id="alert-dialog-slide-description"
            className="dialog-content-text"
          ></DialogContentText>
        </DialogContent>
        <DialogActions className="option-cell">
          <div className="cancel-button">
            <Button onClick={handleCloseDeleteUser}>
              <div className="cancel-button-text">??????</div>
            </Button>
          </div>
          <div className="accept-button">
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button onClick={onDeleteUser}>
                <div className="accept-button-text">?????? ??????</div>
              </Button>
            </Link>
          </div>
        </DialogActions>
      </Dialog>
    </div>

    // <div className="mypage-setting">
    //   <div className="background"></div>
    //   <div className="big-circle"></div>

    //   <div className="user-name"> {`?????? : ${userName} ?????????`}</div>
    //   <div className="background2">
    //     <div>????????????</div>
    //     <div>??????:
    //     <input defaultValue={userName} disabled={onOff === false} onChange={onNewUserName}></input>
    //     </div>
    //     <hr></hr>

    //     <div>???????????????</div>
    //     <div>?????????:
    //     <input defaultValue={userNick} disabled={onOff === false} onChange={onNewUserNick}></input>
    //     </div>
    //     <hr></hr>

    //     <div> ???????????? </div>
    //     <div> ????????????:
    //     <input defaultValue={userPhone} disabled={onOff === false} onChange={onNewUserPhone}></input>
    //       <div className="button-update">
    //         <Button onClick={updateTry}>
    //           <div className="button-text-color">
    //             ??????
    //           </div>
    //         </Button>
    //       </div>
    //       {/* if (onOff) {} */}
    //       <div className="button-submit">
    //         <Button onClick={onSubmit}>
    //           <div className="button-text-color">
    //             ??????
    //           </div>
    //         </Button>
    //       </div>
    //     </div>
    //     <hr></hr>

    //     <div className="button-submit">
    //     <Button onClick={handleOpenChangePassword}>
    //       <div className="button-text-color">???????????? ????????????</div>
    //     </Button>
    //     </div>

    //     {/* style={{ textDecoration: 'none' } ??? to ????????? ????????? ?????? ????????? ?????? */}
    //     <div className="button-logout">
    //       <Link to="/" style={{ textDecoration: 'none' }}>
    //         <Button onClick={logOut}>
    //           <div className="button-text-color">????????????</div>
    //         </Button>
    //       </Link>
    //     </div>

    //     <div className="button-logout">
    //         <Button onClick={handleOpenDeleteUser}>
    //           <div className="button-text-color">?????? ????????????</div>
    //         </Button>
    //     </div>

    //     <div className="button-logout">
    //         <Button onClick={test2}>
    //           <div className="button-text-color">?????????</div>
    //         </Button>
    //     </div>

    //     <Dialog
    //       open={openChangePassword}
    //       TransitionComponent={Transition}
    //       keepMounted  //??
    //       onClose={handleCloseChangePassword}
    //       aria-describedby="alert-dialog-slide-description"
    //     >
    //       <DialogTitle className="dialog-title">{"??????????????? ???????????????"}</DialogTitle>
    //       <DialogContent className="dialog-content">
    //         <div>
    //           ?????? ??????????????? ??? ??????????????? ???????????????.
    //           <br />
    //           <br />
    //           <br />
    //         </div>
    //         <DialogContentText
    //           id="alert-dialog-slide-description"
    //           className="dialog-content-text">

    //           <label for="currentPassword" >?????? ????????????</label>
    //           <div>
    //             <Input
    //               value={currentPassword}
    //               id="currentPassword"
    //               className="dialog-input"
    //               onChange={onCurrentPassword}

    //             ></Input>
    //           </div>
    //           <br/>

    //           <label for="newPassword">??? ????????????</label>
    //           <div>
    //             <Input
    //               value={newPassword}
    //               id="newPassword"
    //               className="dialog-input"
    //               onChange={onNewPassword}
    //               ></Input>
    //           </div>

    //         </DialogContentText>
    //       </DialogContent>
    //       <DialogActions className="option-cell">
    //         <div className="cancel-button">
    //           <Button onClick={handleCloseChangePassword}>
    //             <div className="cancel-button-text">??????</div>
    //           </Button>
    //         </div>
    //         <div className="accept-button">
    //           <Button onClick={onSubmitPassword}>
    //             <div className="accept-button-text">??????</div>
    //           </Button>
    //         </div>
    //       </DialogActions>
    //     </Dialog>

    //     <Dialog
    //       open={openDeleteUser}
    //       TransitionComponent={Transition}
    //       keepMounted  //??
    //       onClose={handleCloseDeleteUser}
    //       aria-describedby="alert-dialog-slide-description"
    //     >
    //       <DialogTitle className="dialog-title">{"?????? ????????????"}</DialogTitle>
    //       <DialogContent className="dialog-content">
    //         <div>
    //           ????????? ????????? ?????????????????????? ?????? ???????????? ?????????????????? ?????? ????????? ?????? ??? ?????????.
    //           <br />
    //           <br />
    //           <br />
    //         </div>
    //         <DialogContentText
    //           id="alert-dialog-slide-description"
    //           className="dialog-content-text">

    //         </DialogContentText>
    //       </DialogContent>
    //       <DialogActions className="option-cell">
    //         <div className="cancel-button">
    //           <Button onClick={handleCloseDeleteUser}>
    //             <div className="cancel-button-text">??????</div>
    //           </Button>
    //         </div>
    //         <div className="accept-button">
    //           <Link to="/">
    //             <Button onClick={onDeleteUser}>
    //               <div className="accept-button-text">?????? ??????</div>
    //             </Button>
    //           </Link>
    //         </div>
    //       </DialogActions>
    //     </Dialog>

    //   </div>
    // </div>
  );
}

export default MypageSetting;
