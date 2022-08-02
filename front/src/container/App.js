<<<<<<< HEAD
import Header from '../components/header/header';
import { Redirect } from 'react-router';
import './App.css';
=======
>>>>>>> 44a92282d90899321e22e068c91be2e1d8bd1d11
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import { createTheme } from '@mui/material/styles';
import Homepage from './homepage';
import Initpage from './Initpage';

function App() {
<<<<<<< HEAD
  let LoggedIn = true;
  // const navigate = useNavigate();
=======
  let LoggedIn = false;
>>>>>>> 44a92282d90899321e22e068c91be2e1d8bd1d11
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={LoggedIn ? <Homepage/> : <Initpage/>}/>
        <Route path="/home" element={<Homepage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
const theme = createTheme({
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: '14px',
        backgroundColor: 'black'
      }
    },
    MuiSnackbarContent: {
      root: {
        backgroundColor: '#202225',
        color: 'white'
      }
    },
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: '#36393E',
        position: 'absolute'
      }
    }
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#7289da'
    },
    secondary: {
      main: '#3ca374'
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600
  }
});
