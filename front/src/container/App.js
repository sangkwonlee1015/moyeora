import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import { createTheme } from '@mui/material/styles';
import Homepage from './homepage';
import Initpage from './Initpage';

function App() {
  let LoggedIn = false;
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
