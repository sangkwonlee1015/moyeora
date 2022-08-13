import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getParticipantListByUser } from "../../api/participant";

//redux
import { useSelector, useDispatch } from "react-redux";
import { SET_CHANNELLIST, SET_CHANNELSEQ } from "../../redux/ChannelList";
import { getChannelInfo } from "../../api/channel";
import { getMapList } from "../../api/map";
import { SET_MAPLIST } from "../../redux/MapList";

export default function ChannelTest() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.UserInfo.accessToken);
  const channelList = useSelector((state) => state.ChannelList.channelList);

  useEffect(() => {
    let list = [];
    getParticipantListByUser(
      token,
      (response) => {
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
  }, []);

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
              {channel.channelName}
              <span class="tooltiptext">{channel.channelName}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
