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
        <IconButton
          color="inherit"
          className="navButton"
          id="navMicButton"
          onClick={this.micStatusChanged}
        >
          {localUser !== undefined && localUser.isAudioActive() ? (
            <Mic />
          ) : (
            <MicOff color="secondary" />
          )}
        </IconButton>

        <IconButton
          color="inherit"
          className="navButton"
          id="navCamButton"
          onClick={this.camStatusChanged}
        >
          {localUser !== undefined && localUser.isVideoActive() ? (
            <Videocam />
          ) : (
            <VideocamOffIcon color="secondary" />
          )}
        </IconButton>

        <IconButton
          color="secondary"
          className="navButton"
          onClick={this.leaveSession}
          id="navLeaveButton"
        >
          <PowerSettingsNew />
        </IconButton>
      </div>
      // </Toolbar>
      // </AppBar>
    );
  }
}
