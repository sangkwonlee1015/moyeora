import "./UpdateChannelInfoDialog.css";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Input from "@mui/material/Input";
import { Checkbox, TextField, Box } from "@mui/material";
import { updateChannel } from "../api/channel";

import { getChannelInfo } from "../api/channel";

import { getFile, registerFile } from "../api/file";

import { useSelector, useDispatch } from "react-redux";

import React, { useEffect } from "react";

function UpdateChannelInfoDialog({ open, setOpen }) {
  const [channelName, setChannelName] = React.useState("");
  const [channelDesc, setChannelDesc] = React.useState("");
  const [channelTag, setChannelTag] = React.useState("");
  const [channelPassword, setChannelPassword] = React.useState("");
  const [checked, setChecked] = React.useState(false);
  console.log("updateChannelDialog!");

  const dispatch = useDispatch();

  const channelSeq = useSelector((state) => state.ChannelList.channelSeq);
  const accessToken = useSelector((state) => state.UserInfo.accessToken);

  const [uploadedFile, setUploadedFile] = React.useState("");
  const [channelImageId, setChannelImageId] = React.useState("");

  const onSecret = () => setChecked((current) => !current);

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

  const handleClose = () => {
    setOpen(false);
    // setChannelName(""); // value 비우기
    // setChannelDesc("");
    // setChannelTag("");
    // setChannelPassword("");
  };

  useEffect(() => {
    getChannelInfo(
      channelSeq,
      accessToken,
      (response) => {
        console.log(response.data);
        setChannelName(response.data.channelName);
        setChannelDesc(response.data.channelDesc);
        setChannelTag(response.data.channelTag);
        if (response.data.uploadedImage !== "") {
          setUploadedFile("data:image;base64, " + response.data.uploadedImage);
        } else {
          setUploadedFile(
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
          );
        }
        if (response.data.channelPassword !== "") {
          setChannelPassword(response.data.channelPassword);
          setChecked(false);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }, [channelSeq]);

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
        <DialogTitle className="dialog-title">채널 정보 수정</DialogTitle>
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
              defaultValue="간단한 채널 소개를 적어주세요~"
              onChange={onChannelDesc}
              value={channelDesc}
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
            ></Input>
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
              sx={{ width: "69.5%", marginLeft: "30px" }}
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
            <Button
              onClick={() => {
                updateChannel(
                  {
                    channelSeq: channelSeq,
                    channelName: channelName,
                    channelDesc: channelDesc,
                    channelTag: channelTag,
                    channelPassword: channelPassword,
                    channelImageId: channelImageId,
                  },
                  accessToken,
                  (response) => {
                    console.log(response);
                  },
                  (error) => {
                    console.log(error);
                  }
                );
              }}
            >
              <div className="accept-button-text">ACCEPT</div>
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UpdateChannelInfoDialog;
