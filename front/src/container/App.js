import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import { createTheme } from '@mui/material/styles';
import Homepage from './homepage';
import Initpage from './Initpage';
import Intro from "../components/intro/intro";
import Emptypage from './emptypage';
import Header from "../components/header/header";

function App() {
  let LoggedIn = false;
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={LoggedIn ? <Homepage/> : <Initpage/>}/>
          <Route path="/dashboard" element={<Homepage/>}/>
          <Route path="/home" element={<Intro/>}/>
        </Routes>
      </BrowserRouter>
      {/* <Header/> */}
    </div>
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
