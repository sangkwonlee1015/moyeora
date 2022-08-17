import "./Home.css";
import React from "react";
import { useNavigate } from "react-router";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Input from "@mui/material/Input";
import {
  Checkbox,
  TextField,
  Box,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { registerFile, getFile } from "../../api/file";

// redux
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { SET_CHANNELLIST } from "../../redux/ChannelList";
import { getParticipantListByUser, registerParticipant } from "../../api/participant";
import { getChannelInfo, registerChannel } from "../../api/channel";


export default function Home() {

  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);


  const [channelName, setChannelName] = React.useState("");
  const [channelDesc, setChannelDesc] =
    React.useState("간단한 채널 소개를 적어주세요~");
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

  const navigate = useNavigate();

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

  const SearchChannel = () => {
    navigate("/searchchannelpage");
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
    <div className="container_intro">
      <h1>Pin to Pin</h1>
      <h2>지도 공통작업을 통해 여행 계획을 효율적으로 세워보세요!</h2>
      <div>
          <button onClick={handleClickOpen} className="homepage-create-channel">채널을 생성해보세요</button>
      </div>
      <br/>
      <div>
          <button onClick={SearchChannel} className="homepage-search-channel">원하는 채널을 찾아보세요</button>
      </div>
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
            <Box
              component="img"
              sx={{
                border: "3px solid #000000",
                // height: "auto",
                width: "100%",
                borderRadius: 3,
              }}
              // className="gradient-border"
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
            <label for="channelName" className="input-label">
              채널 이름
            </label>
            <br />
            <br />
            <Input
              sx={{ width: "100%" }}
              value={channelName}
              id="channelName"
              className="input"
              onChange={onChannelName}
              // inputRef={(input) => {
              //   if(input != null) {
              //      input.focus();
              //   }
              // }}
            ></Input>
            <br />
            <br />
            <label htmlFor="channelDesc" className="input-label">
              채널 소개글
            </label>
            <br />
            <TextField
              sx={{ width: "100%" }}
              id="channelDesc"
              multiline
              rows={4}
              onChange={onChannelDesc}
              value={channelDesc}
              fullWidth
              defaultValue="간단한 채널 소개를 적어주세요~"
              className="textField"
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
              sx={{ width: "100%" }}
              value={channelTag}
              id="channelTag"
              className="input"
              onChange={onChannelTag}
              fullWidth
            ></Input>
            <br />
            <br />

            <label htmlFor="channelSecret" className="input-label">
              비밀방
            </label>
            <Checkbox id="channelSecret" onClick={onSecret}></Checkbox>
            <label htmlFor="channelSecret" className="input-label">
              비밀번호{" "}
            </label>
            <Input
              sx={{ width: "69%", marginLeft: "30px" }}
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
