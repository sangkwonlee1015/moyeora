import Header from "../components/header/Header";
import Intro from "../components/Intro";
import React, { useState } from 'react';
import './homepage.css'

export default function Homepage(){
    console.log("Homepage");
    return (
        <div className="comp">
            <div>
                <Header></Header>
            </div>
            <div>
                <Intro></Intro>
            </div>
        </div>
    );
}