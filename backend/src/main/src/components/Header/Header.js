import * as React from 'react';
import './Header.css'
import {Link} from 'react-router-dom'

// react-icon
import { FaHome, FaPlus, FaSearch, FaCog } from "react-icons/fa";
// mui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

import ChannelTest from './ChannelTest'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Header(){
  const [open, setOpen] = React.useState(false);
  const [openUser, setOpenUser] = React.useState(false);

  const handleClickOpenUser = () => {
    setOpenUser(true);
  };

  const handleCloseUser = () => {
    setOpenUser(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
    return (
        // 라우터 설정 home, channel들, 생성,  찾기,마이페이지
        <div className="container">
          <div className="header_items">
            <Link to="/homepage">
              <FaHome class='home_svg' size="40" color="#e2e3e4"/>
              <span class="tooltiptext">홈</span>
            </Link>
          </div>            
          <ChannelTest/>
            <div className="header_items headerSetting"><Link to="" onClick={handleClickOpen}><FaPlus size="20"/><span class="tooltiptext">채널 추가하기</span></Link></div>
            <div className="header_items headerSetting"><Link to="/addchannelpage"><FaSearch size="20"/><span class="tooltiptext">채널 살펴보기</span></Link></div>
            <div className="header_items headerSetting"><Link to="" onClick={handleClickOpenUser}><FaCog size="20"/><span class="tooltiptext">사용자 설정</span></Link></div>
            
            <Dialog
              open={openUser}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleCloseUser}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>{"사용자 설정"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  사용자 설정...<br/>
                  Let Google help apps determine location. This means sending anonymous
                  location data to Google, even when no apps are running.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseUser}>Disagree</Button>
                <Button onClick={handleCloseUser}>Agree</Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>{"채널 추가하기"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  채널 추가하기 ...<br/>
                  Let Google help apps determine location. This means sending anonymous
                  location data to Google, even when no apps are running.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={handleClose}>Agree</Button>
              </DialogActions>
            </Dialog>
        </div>
    );
}
