import React, {Component} from "react";
import "./Mode.scss";

export default class Mode extends Component{

    render(){
        console.log(this.props.mode)
        return(
            <h1>Active mode: <span>{this.props.mode}</span></h1>
        );
    }
}