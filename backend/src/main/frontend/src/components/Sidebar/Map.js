// mui
import Button from '@mui/material/Button';
import { Input } from '@mui/material';

// redux
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { SET_CURRENTMAP } from "../../redux/MapList";
import { SET_PINLIST } from "../../redux/PinList";

import * as React from 'react';

import { Link } from "react-router-dom";
import { registerMap } from "../../api/map";
import { getPinList } from "../../api/pin";
import "./Sidebar.css";





function Map(props) {
  const [mapName, setMapName] = React.useState(false);

  const token = useSelector((state) => state.UserInfo.accessToken);
  const dispatch = useDispatch();

  function openMap(mapSeq) {
    getPinList(
      mapSeq,
      token,
      (response) => {
        let pinList = response.data.pinList;
        pinList.map((pin) => {
          pin.isVisible = false;
        });
        dispatch(SET_PINLIST(pinList));
      },
      (error) => {
        console.log(error);
      }
    );
    dispatch(SET_CURRENTMAP(mapSeq));
  }
  return (
    <div>
      <Link
        to={`/mappage/${props.channelSeq}/${props.mapSeq}`}
        onClick={() => {
          openMap(props.mapSeq);
        }}
      >
        {props.mapName}


      </Link>
    </div>
  );
}

export default Map;
