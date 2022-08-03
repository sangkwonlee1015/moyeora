import Header from "../components/header/Header";
import Home from "../components/home/Home";
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