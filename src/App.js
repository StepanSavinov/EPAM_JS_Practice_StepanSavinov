import React, {Component} from "react";
import Footer from "./components/Footer";
//import Mode from "./components/Mode";
import "./App.scss";

export default class App extends Component{

    render() {
        return(
            <div className="page-container">
                <div className="content-wrap">
                    {/*<Mode/>*/}
                </div>
                <Footer/>
            </div>
        );
    }
}