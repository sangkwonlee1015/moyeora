import Header from "../components/Header/Header";
import Home from "../components/Home/Home";
import React, { useState } from 'react';
import './Homepage.css'

export default function Homepage(){
    console.log("Homepage");
    return (
        <div className="comp">
            <Header/>
            <Home className="intro"/>
        </div>
    );
}
