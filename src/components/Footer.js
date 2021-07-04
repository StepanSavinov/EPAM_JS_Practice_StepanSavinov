import React, {Component} from "react";
import { FaMicrophone } from "react-icons/fa";
import {MdPlaylistPlay, MdSpeaker} from "react-icons/md";
import Mode from "./Mode";
import "./footer.scss";

export default class Footer extends Component {
    mode;
    constructor(props) {
        super(props);
        this.state = {
            mode: this.mode
        };
    }
    render()
    {
        return (
            <div className="mode">
            <Mode mode={this.mode}/>
            <div className="main-footer">
                <div className="container">
                    <div className="row">
                        {/* icon 1 */}
                        <div className="col">
                            <button className="btnFocus" onClick={() => {
                                this.mode = "all voices";
                                this.setState({
                                    mode: this.mode
                                });
                            }}>
                                <MdPlaylistPlay size={32}></MdPlaylistPlay><p className="iconLabel">All
                                voices</p>
                            </button>
                        </div>
                        {/* icon 2 */}
                        <div className="col">
                            <button className="btnFocus" onClick={() => {
                                this.mode = "speaker";
                                this.setState({
                                    mode: this.mode
                                });
                            }}>
                                <FaMicrophone size={32}></FaMicrophone><p
                                className="iconLabel">Microphone</p>
                            </button>
                        </div>
                        {/* icon 3 */}
                        <div className="col">
                            <button className="btnFocus" onClick={() => {
                                this.mode = "stream";
                                this.setState({
                                    mode: this.mode
                                });
                            }}>
                                <MdSpeaker size={32}></MdSpeaker><p className="iconLabel">Stream</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}


//export default Footer;