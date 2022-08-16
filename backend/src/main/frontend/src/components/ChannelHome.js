import {
  deleteParticipant,
  getParticipantListByChannel,
} from "../api/participant";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

import ChannelParticipant from "./ChannelParticipant";
import { deleteChannel, getChannelInfo } from "../api/channel";
import "./ChannelHome.css"

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
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";
import { Stack } from "@mui/material";

function ChannelHome(props) {
  const channelSeq = useSelector((state) => state.ChannelList.channelSeq); //33
  const token = useSelector((state) => state.UserInfo.accessToken);

  const [pList, setPList] = useState([]);
  // const [channelInfo, setChannelInfo] = useState([객체배열 포맷]);

  const [channelDesc, setChannelDesc] = useState();
  const [channelName, setChannelName] = useState();
  const [channelTag, setChannelTag] = useState();

  console.log(pList);

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

    getChannelInfo(
      channelSeq,
      token,
      (response) => {
        console.log("채널정보 불러오기 성공", response.data)
        // setChannelInfo(response.data)
        setChannelDesc(response.data.channelDesc)
        setChannelName(response.data.channelName)
        setChannelTag(response.data.channelTag)
      },
      (error) => {
        console.log("채널정보 불러오기 에러", error)
      }

    )

  }, [channelSeq]);

  return (
    <div className="channel-home">
      {/* <h2>서버홈</h2> */}
      <div className="channel-background">
        <h2>채널 소개</h2>
        <br />
        채널 이름 {channelName} {'('}#{channelSeq}{')'}
        <br />
        채널 설명 {channelDesc}
        <br />
        채널 태그 {channelTag}

        <br />
        <br />
        <br />


        <div>
          <br />
          <h3>현재 채널 참여자 목록:{" "}</h3>
          {pList.map((item, index) => {
            return (

              <div className="abc">
                <ChannelParticipant className="def"
                  key={index}
                  userSeq={item.participantsId.userSeq}
                ></ChannelParticipant>
              </div>


            );
          })}
        </div>

        

        
      </div>
    </div>
  );
}

export default ChannelHome;
