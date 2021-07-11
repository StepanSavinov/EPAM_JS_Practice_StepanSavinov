import React from "react";
import Footer from "./components/Footer";
import "./App.scss";

function App({socket}){
    return(
        <div className="page-container">
            <div className="content-wrap">
            </div>
            <Footer socket={socket}/>
        </div>
    );
}

export default App;
