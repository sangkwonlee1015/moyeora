import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//redux
import { useSelector, useDispatch } from "react-redux";
import { SET_CHANNELLIST, SET_CHANNELSEQ } from "../../redux/ChannelList";
import { getChannelInfo } from "../../api/channel";
import { getMapList } from "../../api/map";
import { SET_MAPLIST } from "../../redux/MapList";
import { getParticipantListByUser } from "../../api/participant";

export default function ChannelTest() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.UserInfo.accessToken);
  const channelList = useSelector((state) => state.ChannelList.channelList);
  const navigate = useNavigate();

  function enterChannel(id) {
    console.log(id);
    getMapList(
      id,
      "channel",
      token,
      (response) => {
        dispatch(SET_MAPLIST(response.data.mapsList));
      },
      (error) => {
        console.log(error);
        if (error.response.data.statusCode === 401) {
          alert("이미 나갔거나 강퇴당한 채널입니다");
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
                    navigate("/homepage");
                    // setChannelList(list);
                  },
                  (error) => {
                    console.log("error", error);
                  }
                );
              });
              navigate("/homepage");
            },
            (error) => {
              console.log(error);
            }
          );
        }
      }
    );
  }

  return (
    <>
      <ul className="header_items">
        {channelList.map((channel) => (
          <li
            key={channel.channelSeq}
            className="header_items_2 headerSetting2"
          >
            <Link
              to={`/serverpage/${channel.channelSeq}`}
              onClick={() => {
                dispatch(SET_CHANNELSEQ(channel.channelSeq));
                enterChannel(channel.channelSeq);
              }}
            >
              <div className="header_chName">{channel.channelName}</div>
              <span class="tooltiptext">{channel.channelName}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
