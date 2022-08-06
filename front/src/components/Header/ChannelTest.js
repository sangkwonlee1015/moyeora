import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SockJs from "sockjs-client";
import StompJs from "stompjs";

//redux
import { useSelector, useDispatch } from "react-redux";
import { setStomp } from "../../redux/action";

export default function ChannelTest() {
  const user = useSelector((store) => store.userReducer.user);
  const channelList = user.userServer;

  const dispatch = useDispatch();

  const enterChannel = (id) => {
    console.log(id);
    const sock = new SockJs("http://localhost:8080/ws");
    const stomp = StompJs.over(sock);

    dispatch(setStomp(stomp));
    console.log(stomp);

    stomp.connect({}, () => {
      // stomp.subscribe("/user/" + id + "/private", (data) => {
      //   const message = JSON.parse(data.body);
      // });
    });
  };

  return (
    <>
      <ul className="header_items">
        {channelList.map((channel) => (
          <li key={channel.channelId}>
            <Link
              to={`/serverpage/${channel.channelId}`}
              onClick={() => enterChannel(channel.channelId)}
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
