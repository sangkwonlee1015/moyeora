import "./SearchChannel.css";
import { useState, useEffect, forwardRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getChannelInfo, getChannelList } from "../api/channel";
import {
  getParticipantListByUser,
  registerParticipant,
} from "../api/participant";
import { SET_CHANNELLIST } from "../redux/ChannelList";
import Pagination from "./Pagination";
import styled from "styled-components";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
  Slide,
  Box,
  TextField,
} from "@mui/material";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>,
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function SearchChannel() {
  const token = useSelector((state) => state.UserInfo.accessToken);
  const [searchName, setSearchName] = useState("");
  const [channellistview, setChannellist] = useState([]);
  const [secretChannel, setSecretChannel] = useState({});
  const [channelPassword, setChannelPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [isWrongPassword, setIsWrongPassword] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const dispatch = useDispatch();

  console.log(searchName, channellistview, limit, page, offset);

  useEffect(() => {
    console.log("useeffect start channellistview", channellistview);
    getChannelList(
      searchName,
      "",
      token,
      (response) => {
        console.log(response.data.channelList);
        setChannellist(response.data.channelList);
        console.log("useeffect channellistview", channellistview);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const handleOpen = () => {
    setOpen(true);
    setChannelPassword("");
    setIsWrongPassword(false);
  };

  const handleClose = () => {
    setOpen(false);
    setChannelPassword("");
    setSecretChannel({});
    setIsWrongPassword(false);
  };

  const onSubmitSearchForm = () => {
    console.log(token);
    console.log("searchName ", searchName);
    getChannelList(
      searchName,
      "",
      token,
      (response) => {
        console.log(response.data.channelList);
        setChannellist(response.data.channelList);
      },
      (error) => {
        console.log(error);
      }
    );
  };
  const onRegisterChannel = (channel) => {
    console.log(channel);
    console.log(token);
    registerParticipant(
      channel,
      token,
      (response) => {
        let list = [];
        getParticipantListByUser(
          token,
          (response) => {
            dispatch(SET_CHANNELLIST(list));
            handleClose();
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
                    channelImageId: data.channelImageId,
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
        console.log("채널 추가  ", response.data);
      },
      (error) => {
        console.log(error);
        if (error.response.status === 400) {
          setIsWrongPassword(true);
        }
      }
    );
  };
  const onChangeSearchName = (e) => {
    setSearchName(e.target.value);
  };
  return (
    <div className="Layout">
      <div className="search">
        <TextField
          id="outlined-basic"
          onChange={onChangeSearchName}
          onKeyUp={onSubmitSearchForm}
          variant="outlined"
          fullWidth
          label="채널 이름 검색"
        />
      </div>

      <label>
        페이지 당 표시할 게시물 수:&nbsp;
        <select
          type="number"
          value={limit}
          onChange={({ target: { value } }) => setLimit(Number(value))}
        >
          <option value="10">10</option>
          <option value="12">12</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </label>

      <div className="main">
        {channellistview.slice(offset, offset + limit).map((channel) => (
          <div className="card">
            <div className="card-header">
              <div className="card-header-is_closed">
                <div className="card-header-text"> 모집중 </div>
                <div className="card-header-number">
                  {" "}
                  {channel.participantsCount} / 6
                </div>
              </div>
            </div>

            <div className="card-body">
              <div className="card-body-header">
                <h1>채널 제목 : {channel.channel.channelName}</h1>
                <p className="card-body-hashtag">
                  채널 태그 : {channel.channel.channelTag}
                </p>
                <p className="card-body-nickname">
                  채널장: {channel.channel.userSeq} (일단은 userSeq)
                </p>
              </div>
              <div className="card-body-description">
                채널 설명 :{channel.channel.channelDesc}
              </div>

              <Box
                component="img"
                sx={{
                  height: 233,
                  width: 350,
                  maxHeight: { xs: 233, md: 167 },
                  maxWidth: { xs: 350, md: 250 },
                }}
                alt="The house from the offer."
                src={"data:image;base64, " + channel.uploadedImage}
              />
              <button
                onClick={() => {
                  if (channel.channel.channelPassword) {
                    handleOpen();
                    setSecretChannel(channel.channel);
                  } else onRegisterChannel(channel.channel);
                }}
              >
                {channel.channel.channelName} 채널 들어가기
              </button>
              <div>
                <button
                  onClick={() => {
                    if (channel.channel.channelPassword) {
                      handleOpen();
                      setSecretChannel(channel.channel);
                    } else onRegisterChannel(channel.channel);
                  }}
                >
                  채널 추가
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <footer>
        <Pagination
          total={channellistview.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </footer>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="dialog-title">{"비밀번호 입력"}</DialogTitle>
        <DialogContent className="dialog-content">
          <DialogContentText
            id="alert-dialog-slide-description"
            className="dialog-content-text"
          >
            <label htmlFor="channelSecret" className="input-label">
              비밀번호
            </label>
            <Input
              value={channelPassword}
              id="channelPassword"
              className="input"
              onChange={(e) => {
                setChannelPassword(e.target.value);
              }}
            ></Input>
            <br />
            {isWrongPassword && (
              <label className="input-label" style={{ color: "#d32f2f" }}>
                비밀번호가 일치하지 않습니다
              </label>
            )}
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
                secretChannel.channelPassword = channelPassword;
                onRegisterChannel(secretChannel);
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
export default SearchChannel;
