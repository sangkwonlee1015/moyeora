import * as React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useState } from "react";
// react-icon
import { FaHome, FaPlus, FaSearch, FaCog } from "react-icons/fa";
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
import { Checkbox, TextField, Box } from "@mui/material";

import ChannelTest from "./ChannelTest";

// redux
import { useSelector } from "react-redux";
import {} from "../../redux/ChannelList";
import { useDispatch } from "react-redux";

import { getParticipantListByUser } from "../../api/participant";
import { registerChannel } from "../../api/channel";
import { getChannelInfo } from "../../api/channel";
import { registerParticipant } from "../../api/participant";

import { getFile, registerFile } from "../../api/file";

// const Transition = React.forwardRef(function Transition(
//   props: TransitionProps & {
//     children: React.ReactElement<any, any>,
//   },
//   ref: React.Ref<unknown>
// ) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

export default function Header() {
  const [open, setOpen] = React.useState(false);
  const [openUser, setOpenUser] = React.useState(false);
  const [checked, setChecked] = React.useState(false);

  const [channelName, setChannelName] = React.useState("");
  const [channelDesc, setChannelDesc] = React.useState("");
  const [channelTag, setChannelTag] = React.useState("");
  const [channelPassword, setChannelPassword] = React.useState("");

  const [uploadedFile, setUploadedFile] = React.useState(
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
  );
  const [channelImageId, setChannelImageId] = React.useState("");

  const dispatch = useDispatch();

  const token = useSelector((state) => state.UserInfo.accessToken);

  const onChannelName = (event) => {
    setChannelName(event.target.value);
  };
  const onChannelDesc = (event) => {
    setChannelDesc(event.target.value);
  };
  const onChannelTag = (event) => {
    setChannelTag(event.target.value);
  };
  const onChannelPassword = (event) => {
    setChannelPassword(event.target.value);
  };

  const onSecret = () => setChecked((current) => !current);

  const handleClickOpenUser = () => {
    setOpenUser(true);
  };

  const handleCloseUser = () => {
    setOpenUser(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setChannelName(""); // value 비우기
    setChannelDesc("");
    setChannelTag("");
    setChannelPassword("");
  };

  const createChannel = () => {
    const channelInfo = {
      channelName,
      channelDesc,
      channelTag,
      channelPassword,
      channelImageId,
    };

    const success = (res) => {
      const channelSeq = res.data.channelSeq;
      const participantInfo = {
        channelPassword: channelPassword,
        channelSeq,
      };
      registerParticipant(participantInfo, token, success, error);
      let list = [];
      getParticipantListByUser(
        token,
        (response) => {
          dispatch(SET_CHANNELLIST(list));
          response.data.list.map((participant) => {
            getChannelInfo(
              participant.participantsId.channelSeq,
              token,
              ({ data }) => {
                let channel = {
                  channelSeq: participant.participantsId.channelSeq,
                  channelDesc: data.channelDesc,
                  channelName: data.channelName,
                  channelTag: data.channelTag,
                  channelImageId: data.uploadedImage,
                };
                list = list.concat(channel);
                dispatch(SET_CHANNELLIST(list));
                // setChannelList(list);
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
      console.log("===============성공");
      handleClose();
      // part
    };

    const error = () => {
      console.log("====================실패");
      handleClose();
    };

    registerChannel(channelInfo, token, success, error); // 채널 만들고,

    let list = [];
    getParticipantListByUser(
      token,
      (response) => {
        dispatch(SET_CHANNELLIST(list));
        response.data.list.map((participant) => {
          getChannelInfo(
            participant.participantsId.channelSeq,
            token,
            ({ data }) => {
              let channel = {
                channelSeq: participant.participantsId.channelSeq,
                channelDesc: data.channelDesc,
                channelName: data.channelName,
                channelTag: data.channelTag,
                channelImageId: data.uploadedImage,
              };
              list = list.concat(channel);
              dispatch(SET_CHANNELLIST(list));
              console.log("채널 완성");
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
  };
  return (
    // 라우터 설정 home, channel들, 생성,  찾기,마이페이지
    <div className="container">
      <div className="header_items">
        <Link to="/homepage">
          <FaHome class="home_svg" size="40" color="#e2e3e4" />
          <span class="tooltiptext">홈</span>
        </Link>
      </div>
      <ChannelTest />
      <div className="header_items headerSetting">
        <Link to="" onClick={handleClickOpen}>
          <FaPlus size="20" />
          <span class="tooltiptext">채널 추가하기</span>
        </Link>
      </div>
      <div className="header_items headerSetting">
        <Link to="/searchchannelpage">
          <FaSearch size="20" />
          <span class="tooltiptext">채널 살펴보기</span>
        </Link>
      </div>
      <div className="header_items headerSetting">
        <Link to="/mypagesettingpage" onClick={handleClickOpenUser}>
          <FaCog size="20" />
          <span class="tooltiptext">사용자 설정</span>
        </Link>
      </div>

      {/* <Dialog
        open={openUser}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseUser}
        aria-describedby="alert-dialog-slide-description"
        className="dialog"
      >
        <DialogTitle className="dialogtext">{"사용자 설정"}</DialogTitle>
        <DialogContent className="dialogtext">
          <DialogContentText id="alert-dialog-slide-description">
            <div className="dialogtext">
              사용자 설정...
              <br />
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions className="option-cell">
          <div className="cancel-button">
            <Button onClick={handleCloseUser}>
              <div className="cancel-button-text">Disagree</div>
            </Button>
          </div>
          <div className="accept-button">
            <Button onClick={handleCloseUser}>
              <div className="accept-button-text">Agree</div>
            </Button>
          </div>
        </DialogActions>
      </Dialog> */}

      <Dialog
        open={open}
        // TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        className="dialog"
      >
        <DialogTitle className="dialog-title">Channel Register</DialogTitle>
        <DialogContent className="dialog-content">
          <DialogContentText
            id="alert-dialog-slide-description"
            className="dialog-content-text"
          >
            <label for="channelName" className="input-label">
              채널 이름
            </label>
            <br />
            <TextField
              id="channelName"
              className="input"
              label="Outlined"
              variant="outlined"
              onChange={onChannelName}
              value={channelName}
            />
            {/* <Input
              value={channelName}
              id="channelName"
              className="input"
              onChange={onChannelName}
              // inputRef={(input) => {
              //   if(input != null) {
              //      input.focus();
              //   }
              // }}
            ></Input> */}
            <br />
            <br />
            <label htmlFor="channelDesc" className="input-label">
              채널 소개글
            </label>
            <br />
            <TextField
              id="channelDesc"
              multiline
              rows={4}
              defaultValue="간단한 채널 소개를 적어주세요~"
              onChange={onChannelDesc}
              value={channelDesc}
            />
            {/* <Input
              value={channelDesc}
              id="channelDesc"
              className="input"
              onChange={onChannelDesc}
            ></Input> */}
            <br />
            <br />
            <label htmlFor="channelTag" className="input-label">
              태그
            </label>
            <br />
            <Input
              value={channelTag}
              id="channelTag"
              className="input"
              onChange={onChannelTag}
            ></Input>
            <br />
            <br />
            <Box
              component="img"
              sx={{
                height: 233,
                width: 350,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
              }}
              alt="The house from the offer."
              src={uploadedFile}
            />
            <br />
            <Button variant="contained" component="label">
              Upload File
              <input
                type="file"
                onChange={(e) => {
                  registerFile(
                    e.target.files[0],
                    (response) => {
                      setChannelImageId(response.data.id);
                      getFile(
                        response.data.id,
                        (response) => {
                          setUploadedFile(
                            "data:image;base64, " + response.data.data
                          );
                        },
                        (error) => {
                          console.log(error);
                        }
                      );
                      // console.log(response.data);
                    },
                    (error) => {
                      console.log(error);
                    }
                  );
                }}
                hidden
              ></input>
            </Button>
            <br />
            <br />
            <label htmlFor="channelSecret" className="input-label">
              비밀방
            </label>
            <Checkbox id="channelSecret" onClick={onSecret}></Checkbox>
            <label htmlFor="channelSecret" className="input-label">
              비밀번호
            </label>
            <Input
              value={channelPassword}
              id="channelPassword"
              className="input"
              onChange={onChannelPassword}
              disabled={checked === false}
            ></Input>
            <br />
          </DialogContentText>
        </DialogContent>
        <DialogActions className="option-cell">
          <div className="cancel-button">
            <Button onClick={handleClose}>
              <div className="cancel-button-text">CANCEL</div>
            </Button>
          </div>
          <div className="accept-button">
            <Button onClick={createChannel}>
              <div className="accept-button-text">ACCEPT</div>
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
