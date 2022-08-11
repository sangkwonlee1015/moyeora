import React from "react"
import { useSelector, useDispatch } from "react-redux";
import { deleteParticipant } from "../../api/participant";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function UserInfo(props){
  const dispatch = useDispatch();
  const token = useSelector((state) => state.UserInfo.accessToken);
  const channelSeq = props.channelSeq

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const LeaveTheChannel = () => {
    const success = (res) => {
      console.log('삭제 성공----')
      console.log(res)
    }
    const error = (res) => {
      console.log('삭제 실패!!!!!!!!!!!!')
      console.log(res)
    }
    console.log(channelSeq, token)
    deleteParticipant((channelSeq, token, success, error))
  }
  
  return (
    // <div className="sidebar_test">
      <div className="userinfo">
        <div className="userinfo_name">
          hi
        </div>
        <div>
          <Button onClick={handleOpen}>채널 나가기</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} style={{backgroundColor: '#202225', borderRadius: '10px'}}>
              <Typography id="modal-modal-title" variant="h6" component="h2" color="white">
                정말 채널을 나가시겠습니까?
                <Stack   
                direction="row-reverse"
                alignItems="center"
                spacing={2}
                style={{marginTop: '2rem'}}>
                  <Button onClick={handleClose}>취소</Button>
                  <Button onClick={LeaveTheChannel} variant="outlined" color="error">
                    채널 나가기
                  </Button>
                </Stack>
              </Typography>
            </Box>
          </Modal>
        </div>
      </div>
    // </div>
  )
}

export default UserInfo