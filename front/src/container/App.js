import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import './App.css';
import Homepage from './Homepage';
import Header from "../components/header/header";
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
          <Route path='/' element={LoggedIn ? <Homepage/> : <Homepage/>}/>
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