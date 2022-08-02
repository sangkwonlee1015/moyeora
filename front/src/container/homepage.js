import Header from "../components/header";
import Intro from "../components/intro";
import React, { useState } from 'react';

export default function homepage(){
    console.log("homepage");
    return (
        <div>
            <Header></Header>
            <Intro></Intro>
        </div>
    );
}