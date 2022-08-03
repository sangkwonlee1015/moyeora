import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import { createTheme } from '@mui/material/styles';
import Homepage from './MainPage';
import Initpage from './Initpage';
import Intro from "../components/intro/Intro";
import Emptypage from './emptypage';
import Header from "../components/header/Header";
import ServerHome from "./ServerHome";
let LoggedIn = false;
function temp(){
  if (LoggedIn){
    console.log("sadada");
    return (<Header/>);
  }
}
function App() {
  
  return (
  
    <div className="app">
      <temp/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={LoggedIn ? <Homepage/> : <Initpage/>}/>
          <Route path="/dashboard" element={<Homepage/>}/>
          {/* <Route path="/dashboard/main" element={<Homepage/>}/> */}
          <Route path="/dashboard/server" element={<ServerHome/>}/>
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
