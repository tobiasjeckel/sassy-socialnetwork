import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";

export function Chat() {
    const chatMessages = useSelector(state => state && state.chatMessages);
    console.log("last 10 chat messages", chatMessages);
    const keyCheck = e => {
        if (e.key === "Enter") {
            e.preventDefault();
            console.log(e.target.value);
            socket.emit("my chat message", e.target.value);
            e.target.value = "";
        }
    };

    const elemRef = useRef();

    useEffect(() => {
        console.log("chat mounted");
        console.log("elemRef: ", elemRef.current);
        console.log("scroll top: ", elemRef.current.scrollTop);
        console.log("scroll height: ", elemRef.current.scrollHeight);
        console.log("client height: ", elemRef.current.clientHeight);
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, []); // this runs only once when loading page

    //use map to loop over the messages
    return (
        <div>
            <h1>Chat Room</h1>
            <div className="chatmessages" ref={elemRef}>
                <p>messages go in here</p>
                <p>messages go in here</p>
                <p>messages go in here</p>
                <p>messages go in here</p>
                <p>messages go in here</p>
                <p>messages go in here</p>
                <p>messages go in here</p>
                <p>messages go in here</p>
                <p>messages go in here</p>
            </div>
            <textarea
                placeholder="enter message here"
                onKeyDown={keyCheck}
            ></textarea>
        </div>
    );
}
