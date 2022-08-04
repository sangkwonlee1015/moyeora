import React, { useEffect } from 'react';
import { Link } from "react-router-dom";


//redux
import { useSelector } from 'react-redux';

export default function ChannelTest(){

  const user = useSelector((store) => store.userReducer.user);
  const channelList = user.userServer

    return (
      <>
        <ul className='header_items'>
          {channelList.map(channel => (
            <li key={channel.channelId}>
              <Link to={`/serverpage/${channel.channelId}`}>{ channel.channelName }</Link>
            </li>
          ))}
        </ul>
      </>
    );
}