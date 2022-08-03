import React, { useState } from 'react';
import {
  Paper,
  Button,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CardMedia,
  Slide,
  TextField,
  Grid,
  IconButton,
  Checkbox
} from '@mui/material';
import { GroupAdd, Person, ArrowBack } from '@mui/icons-material';
import { useNavigate } from "react-router";
import axios from 'axios';



const LoginPage = ()=>{
  
  const navigate = useNavigate();
  // Dispatch

  // Local state to control Modal Windows + Data fields
  const [mainVisible, setMainVisible] = useState(true);
  const [mainDirection, setMainDirection]= useState('left');
  const [createVisible, setCreateVisible] = useState(false);
  const [createDirection, setCreateDirection] = useState('left');
  const [loginVisible, setLoginVisible] = useState(false);
  const [loginDirection, setLoginDirection] = useState('left');
  const [userName, setUserName] = useState('');
  const [userPass, setUserPass] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Shows the main modal (sets transition directions and views to visible / non visible)
  const showMain = () => {
    setMainDirection('left');
    setMainVisible(true);
    setCreateVisible(false);
    setCreateDirection('right');
    setLoginVisible(false);
    setLoginDirection('right');
  };

  // Handles showing the Join Server window
  const showCreateAccount = () => {
    setCreateDirection('left');
    setMainDirection('right');
    setCreateVisible(true);
    setMainVisible(false);
  };

  // Handles showing the Create Server window
  const showLoginAccount = () => {
    setLoginDirection('left');
    setMainDirection('right');
    setLoginVisible(true);
    setMainVisible(false);
  };

  // Handles and checks keypress and calls the callback method

  // Validates input and calls callback function
  
  // Handles creation of account and calls sign in action
 

  // Handles login of account and calls sign in action
 

  // Renders options to Create or Login to account
  const renderMain = () => {
    return (
      <Slide direction={mainDirection} in={mainVisible} timeout={350} mountOnEnter unmountOnExit>
        <Grid container spacing={3} justify="center" alignItems="center">
          <Grid item sm={12} xs={12}>
            <Typography variant="h5" color="primary" align="center">
              Create an account, or sign in!
            </Typography>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Card className="grid-card">
              <CardActionArea onClick={() => showCreateAccount()}>
                <CardContent>
                  <Typography variant="h5" color="primary" gutterBottom>
                    Create
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Create a new account.
                  </Typography>
                  <CardMedia>
                    <GroupAdd className="modal-card-icon" />
                  </CardMedia>
                  <Button variant="contained" color="primary">
                    Create
                  </Button>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Card className="grid-card">
              <CardActionArea onClick={() => showLoginAccount()}>
                <CardContent>
                  <Typography variant="h5" color="secondary" gutterBottom>
                    Login
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Sign in to an existing account.
                  </Typography>
                  <CardMedia>
                    <Person className="modal-card-icon" />
                  </CardMedia>
                  <Button variant="contained" color="secondary">
                    Login{' '}
                  </Button>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Slide>
    );
  };

  // Renders the form to create an account
  const renderCreateAccount = () => {
    return (
      <Slide direction={createDirection} in={createVisible} timeout={350} mountOnEnter unmountOnExit>
        <Grid container spacing={1} justify="center" alignItems="center">
          <Grid item xs={12}>
            <IconButton onClick={showMain}>
              <ArrowBack />
            </IconButton>
            <Typography variant="h5" color="primary" align="center">
              Create Account
            </Typography>
          </Grid>
          <Grid item xs={12} className="grid-textfield">
            <TextField
              id="username"
              label="Username"
              value={userName}
              onChange={e => setUserName(e.target.value)}
              margin="dense"
              autoComplete="off"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} className="grid-textfield">
            <TextField
              id="password"
              label="Password"
              type="password"
              value={userPass}
              onChange={e => setUserPass(e.target.value)}
              margin="dense"
              autoComplete="off"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} className="grid-button">
            <div>
              Remember Me <Checkbox value={rememberMe} onChange={e => setRememberMe(e.target.checked)} />
            </div>
            <Button
              variant="contained"
              color="primary"
            >
              Create
            </Button>
          </Grid>
        </Grid>
      </Slide>
    );
  };

  // Renders the form to login to account
  const renderLoginAccount = () => {
    return (
      <Slide direction={loginDirection} in={loginVisible} timeout={350} mountOnEnter unmountOnExit>
        <Grid container spacing={2} justify="center" alignItems="center">
          <Grid item xs={12}>
            <IconButton onClick={showMain}>
              <ArrowBack />
            </IconButton>
            <Typography variant="h5" color="primary" align="center">
              Login 111
            </Typography>
          </Grid>
          <Grid item xs={12} className="grid-textfield">
            <TextField
              id="username"
              label="Username"
              value={userName}
              onChange={e => setUserName(e.target.value)}
              margin="dense"
              autoComplete="off"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} className="grid-textfield">
            <TextField
              id="password"
              label="Password"
              type="password"
              value={userPass}
              onChange={e => setUserPass(e.target.value)}
              margin="dense"
              autoComplete="off"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} className="grid-button">
            <div>
              Remember Me <Checkbox value={rememberMe} onChange={e => setRememberMe(e.target.checked)} />
            </div>
            <Button
              className="modal-login-button"
              variant="contained"
              color="primary"
              onClick={() => onLogin(userName, userPass)}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Slide>
    );
  };

  const onLogin = (email, password) => {
    const data = {
      email,
      password,
    };
    axios.post('/api/v1/auth/login', data).then(response => {
      const { accessToken } = response.data;
  
      // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  
      // accessToken을 localStorage, cookie 등에 저장하지 않는다!
  
    }).catch(error => {
      // ... 에러 처리
      console.log("login requset fail : " + error);
    }).finally(()=>{console.log("login request end")});
  }
  // const onClickfunc = () =>{
  //   console.log("login button click")
  //   navigate("/home")
  // }

  return (
    <div className="auth-wrapper">
      <Paper className="container-prompt">
        {renderMain()}
        {renderCreateAccount()}
        {renderLoginAccount()}
      </Paper>
    </div>
  );
}

export default LoginPage;
