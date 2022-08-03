import Header from "../components/header/Header";
import Intro from "../components/intro/Intro";
import './MainPage.css'

export default function homepage(){
    console.log("homepage !!!!!");
    return (
        <div className="comp">
            <Intro/>
        </div>
    );
}