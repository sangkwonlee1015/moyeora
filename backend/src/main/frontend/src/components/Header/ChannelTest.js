import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//redux
import { useSelector, useDispatch } from "react-redux";
import { SET_CHANNELSEQ, SET_CHANNELTOKEN } from "../../redux/ChannelList";
import { getChannelInfo } from "../../api/channel";
import { getMapList } from "../../api/map";
import { SET_MAPLIST } from "../../redux/MapList";

export default function ChannelTest() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.UserInfo.accessToken);
  const channelList = useSelector((state) => state.ChannelList.channelList);

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
                getChannelInfo(
                  channel.channelSeq,
                  token,
                  (response) => {
                    dispatch(SET_CHANNELTOKEN(response.data.token));
                  },
                  (error) => {
                    console.log(error);
                  }
                );
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
