import React, { useEffect } from 'react';
import { Link } from "react-router-dom";


//redux
import { useSelector } from 'react-redux';

export default function ChannelTest(){

  const user = useSelector((store) => store.userReducer.user);
  const channelList = user.userServer

    return (
      <>
        <ul className='channel_list'>
          {channelList.map(channel => (
            <Link to={`/serverpage/${channel.channelId}`}>{ channel.channelName }
              <li key={channel.channelId}></li>
            </Link>
          ))}
        </ul>
      </>
    );
}