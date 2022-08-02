import Header from "../components/header/header";
import Intro from "../components/intro";
import React, { useState } from 'react';
import './homepage.css'

export default function homepage(){
    console.log("homepage");
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