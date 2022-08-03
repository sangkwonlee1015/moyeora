import Header from "../components/header/header";
import Intro from "../components/intro/intro";
import './homepage.css'

export default function homepage(){
    console.log("homepage !!!!!");
    return (
        <div className="comp">
            <Header/>
            <Intro/>
        </div>
    );
}