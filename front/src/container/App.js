import Header from '../components/header';
import { Redirect } from 'react-router';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Initpage from './Initpage';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import Homepage from './homepage';
import { useNavigate } from "react-router";

function App() {
  let LoggedIn = true;
  const navigate = useNavigate();
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/dashboard" element={<Homepage/>}></Route>
        <Route exact path="/">
          {LoggedIn ? navigate("/dashboard") :
          <ThemeProvider theme={theme}>
            <Initpage></Initpage>
          </ThemeProvider>}
        </Route>
      </Routes>
    </BrowserRouter>

    // <ThemeProvider theme={theme}>
    //   <Initpage></Initpage>
    // </ThemeProvider>
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
