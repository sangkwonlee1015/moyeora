import * as React from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom";
import "./MypageSidebar.css";

// mui
import Button from '@mui/material/Button';
import { Input } from '@mui/material';

// redux
import { useSelector } from "react-redux";

import { registerMap } from "../../api/map";

function Map(props) {

  const [mapName, setMapName] = React.useState(false);

  const token = useSelector((state) => state.UserInfo.accessToken);

  const test = () => {
    console.log("+누름");
  }
  const onChange = (event) => {
    console.log(event.target.value, + "ㅇㅇㅇㅇㅇㅇㅇ")
    setMapName(event.target.value)
  }

  const createChannel = () => {
    const mapInfo = {
      mapName,
      channelSeq : "1",
    }
  
    console.log(mapInfo, token)


    const success = () => {
      console.log("성공")
    }
    const error = () => {
      console.log("실패")
    }

    registerMap(mapInfo, token, success, error)
  }
  return (
    <div>
      {/* <Link to={`/mappage/${props.channelSeq}`}> */}
        Map
        <button variant="text" className="tooltip register-map " onClick={test}>
          +
          <span className="tooltiptext">
            Map 추가하기
          </span>
        </button>
      {/* </Link> */}

      <input value={mapName} onChange={onChange}>
      </input>

      <Button onClick={createChannel}>
        <div className="accept-button-text">
          ACCEPT
        </div>
      </Button>
    </div>

  );
}

export default Map;