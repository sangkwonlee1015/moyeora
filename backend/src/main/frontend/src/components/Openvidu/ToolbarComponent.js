import React, { Component } from "react";
// import "./ToolbarComponent.css";

// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";

import Mic from "@mui/icons-material/Mic";
import MicOff from "@mui/icons-material/MicOff";
import Videocam from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import PowerSettingsNew from "@mui/icons-material/PowerSettingsNew";
import IconButton from "@mui/material/IconButton";

import "./Openvidu.css";

// const logo = require("../../assets/images/openvidu_logo.png");

export default class ToolbarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { fullscreen: false };
    this.camStatusChanged = this.camStatusChanged.bind(this);
    this.micStatusChanged = this.micStatusChanged.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
  }

  micStatusChanged() {
    this.props.micStatusChanged();
  }

  camStatusChanged() {
    this.props.camStatusChanged();
  }

  leaveSession() {
    this.props.leaveSession();
  }

  render() {
    const mySessionId = this.props.sessionId;
    const localUser = this.props.user;
    return (
      <div className="buttonsContent">
        <div className="navMicButton_circle">
          <IconButton onClick={this.micStatusChanged}>
            {localUser !== undefined && localUser.isAudioActive() ? (
              <Mic className="navMicButton" />
            ) : (
              <MicOff className="MicOff" />
            )}
          </IconButton>
        </div>

        <div className="navCamButton_circle">
          <IconButton onClick={this.camStatusChanged}>
            {localUser !== undefined && localUser.isVideoActive() ? (
              <Videocam className="navCamButton" />
            ) : (
              <VideocamOffIcon className="VideocamOffIcon" />
            )}
          </IconButton>
        </div>
        {/* <div className="navLeaveButton_circle">
          <IconButton onClick={this.leaveSession}>
            <PowerSettingsNew className="navLeaveButton" />
          </IconButton>
        </div> */}
      </div>
    );
  }
}
