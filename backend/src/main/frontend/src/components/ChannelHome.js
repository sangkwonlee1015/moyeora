import {
  deleteParticipant,
  getParticipantListByChannel,
} from "../api/participant";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

import ChannelParticipant from "./ChannelParticipant";
// import { getChannelInfo } from "../api/channel";
import { deleteChannel, getChannelInfo } from "../api/channel";
import "./ChannelHome.css";

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
import { Link } from "react-router-dom";
import { Stack } from "@mui/material";
import { Box } from "@mui/material";
import UpdateChannelInfoDialog from "./UpdateChannelInfoDialog";
import styled from "styled-components";

function ChannelHome(props) {
  const channelSeq = useSelector((state) => state.ChannelList.channelSeq); //33
  const token = useSelector((state) => state.UserInfo.accessToken);
  const [channelInfo, setChannelInfo] = useState({});
  const [open, setOpen] = useState(false);

  const [pList, setPList] = useState([]);
  // const [channelInfo, setChannelInfo] = useState([객체배열 포맷]);

  const [channelDesc, setChannelDesc] = useState();
  const [channelName, setChannelName] = useState();
  const [channelTag, setChannelTag] = useState();
  const [channelImage, setChannelImage] = useState("https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2");

  const setImage = () => {
    const image = channelInfo.uploadedImage==="AA=="?"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2" : "data:image;base64, " + channelInfo.uploadedImage
    setChannelImage(image)
  }

  useEffect(() => {
    getParticipantListByChannel(
      channelSeq,
      token,
      (response) => {
        setPList(response.data.list);
      },
      (error) => {
        console.log(error);
      }
    );
    getChannelInfo(channelSeq, token, (response) => {
      setChannelInfo(response.data);
      setChannelDesc(response.data.channelDesc);
      setChannelName(response.data.channelName);
      setChannelTag(response.data.channelTag);
    });
    setImage()
  }, [channelSeq, channelImage]);

  const ChannelHomePage = styled.div`
  width: 100%;
  background-image: url(${channelImage});
  background-size: cover;
`;

  return (
    <ChannelHomePage>
      <button
        onClick={() => {
          setOpen(true);
        }}
      >
        채널정보수정
      </button>
      <UpdateChannelInfoDialog
        open={open}
        setOpen={(b) => {
          setOpen(b);
        }}
      ></UpdateChannelInfoDialog>
      <div className="channel-background">
        {/* <h2>채널소개</h2> */}
        <br />
        <div className="channel-name">
          {channelName} {"("}#{channelSeq}{")"} {/*채널이름*/} {/*채널seq*/}
        </div>
        <br />
        <div className="channel-desc">
          {channelDesc} {/*채널설명*/}
        </div>
        <br />
        <div className="channel-tag">{channelTag}</div> {/*채널태그*/}
          
        <br />
        <br />
        <br />
        <div>
          <br />
          현재 채널 참여자 목록:{" "}
          <div style={{ display: "flex", margin: "3px"}}>
            {pList.map((item, index) => {
              return (
                <ChannelParticipant
                  key={index}
                  userSeq={item.participantsId.userSeq}
                ></ChannelParticipant>
              );
            })}
          </div>
          <br />
          {/* 현재 채널 참여자 정보: */}
          {channelInfo ? (
            <Box
              component="img"
              sx={{
                height: 233,
                width: 350,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
              }}
              alt="The house from the offer."
              src={channelInfo.uploadedImage==="AA=="?"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2" : "data:image;base64, " + channelInfo.uploadedImage}
            />
          ) : null}
        </div>
      </div>
    </ChannelHomePage>
  );
}


export default ChannelHome;
