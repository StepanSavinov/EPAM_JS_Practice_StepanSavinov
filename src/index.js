import React from "react";
import ReactDOM from "react-dom";
import {io} from "socket.io-client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

const socket = io("https://voicy-speaker.herokuapp.com");

ReactDOM.render(
    <React.StrictMode>
        <App socket={socket} />
    </React.StrictMode>,
    document.getElementById("root")
);
