import React, {useEffect, useState} from "react";
import {FaMicrophone} from "react-icons/fa";
import {MdPlaylistPlay, MdSpeaker} from "react-icons/md";
import "./footer.scss";

function Footer({socket}){

//region getVoices
    async function getVoices(){
        const data = await fetch('https://voicy-speaker.herokuapp.com/voices')
        const receivedData = await data.json()

        for (let i = receivedData.length - 5; i < receivedData.length; i++) {

            const audio = document.createElement('audio');
            audio.controls = true;

            const audioBlob = new Blob([new
            Uint8Array(receivedData[i].audioBlob[0].data).buffer]);

            const audioUrl = URL.createObjectURL(audioBlob);
            audio.src = audioUrl

            const li = document.createElement('li');
            li.classList.add('audioElement');
            li.classList.add('voiceMessage');
            li.innerHTML = receivedData[i].timeStamp.substr(0, 24)
            li.appendChild(audio)

            document.querySelector(".audioMessages").appendChild(li);
        }
    }

    function showVoices(){
        ul = document.createElement("ul");
        ul.className = "audioMessages";
        container.appendChild(ul);
        getVoices();
    }
//endregion

//region Speaker

    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);

    function startRecord() {
        mediaRecorder.start();
        socket.emit('recordStarted');
    }

    function stopRecord() {
        if (mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
        }
    }

    useEffect(() => {
        const recordAudio = () => {
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(stream => {
                    const mediaRecorder = new MediaRecorder(stream);
                    setMediaRecorder(mediaRecorder);

                    mediaRecorder.addEventListener("dataavailable", event => {
                        audioChunks.push(event.data);
                    });

                    mediaRecorder.addEventListener("stop", () => {
                        socket.emit('audioMessage', audioChunks);
                        setAudioChunks([]);
                    });
                });
        }

        recordAudio();
    }, [audioChunks, socket])

    function showRecordButton(){
        btn = document.createElement("button");
        btn.className = "btnMode";
        btn.innerHTML = "Press & hold to record a voice line";
        container.appendChild(btn);

        btn.onmousedown = () => {
            startRecord();
        }

        btn.onmouseup = () => {
            stopRecord();
        }
    }

//endregion

//region Stream
    function getStream(){
        socket.on('audioMessage', function (audioChunks) {
            const audioBlob = new Blob(audioChunks);
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            audio.play();
        });

        return () => socket.off('audioMessage');
    };

    function startListening(){
        text = document.createElement("span");
        text.className = "streamingText";
        text.innerHTML = "Streaming voices";
        container.appendChild(text);
        getStream();
    }

//endregion

    let container;
    let ul;
    let btn;
    let text;

    return (
        <div className="main-footer">
            <hr/>
            <div className="container">
                <div className="row">

                    {/* icon 1 */}

                    <div className="col">
                        <input className="radioButton" type="radio" value="AllVoices" name="radio" id="radio1" onChange={() => {
                            container = document.querySelector(".content-wrap");
                            if (!container.hasChildNodes()){
                                showVoices();
                            }

                            else{
                                while(container.hasChildNodes()){
                                    container.removeChild(container.firstChild)
                                }

                                showVoices();
                            }
                        }}/>
                        <label className="radioLabel" htmlFor="radio1">
                            <p><MdPlaylistPlay size={32}></MdPlaylistPlay></p>All voices
                        </label>
                    </div>

                    {/* icon 2 */}

                    <div className="col">
                        <input className="radioButton" type="radio" value="Microphone" name="radio" id="radio2" onChange={() => {
                            container = document.querySelector(".content-wrap");

                            if (!container.hasChildNodes()){
                                showRecordButton();
                            }

                            else{
                                while(container.hasChildNodes()){
                                    container.removeChild(container.firstChild)
                                }

                                showRecordButton();
                            }
                        }}/>
                        <label className="radioLabel" htmlFor="radio2">
                            <p><FaMicrophone size={32}></FaMicrophone></p>Microphone
                        </label>
                    </div>

                    {/* icon 3 */}

                    <div className="col">
                        <input className="radioButton" type="radio" value="Stream" name="radio" id="radio3" onChangeCapture={() => {
                            container = document.querySelector(".content-wrap");

                            if (!container.hasChildNodes()){
                                startListening();
                            }

                            else{
                                while(container.hasChildNodes()){
                                    container.removeChild(container.firstChild)
                                }
                                startListening();
                            }
                        }}/>
                        <label className="radioLabel" htmlFor="radio3">
                            <p><MdSpeaker size={32}></MdSpeaker></p>Stream
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;
