import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";

export function Chat() {
    const chatMessages = useSelector(state => state && state.chatMessages); //get this from state
    // console.log("last 10 chat messages from state: ", chatMessages);
    const keyCheck = e => {
        if (e.key === "Enter") {
            e.preventDefault();
            console.log("message sent to server", e.target.value);
            socket.emit("new-message", e.target.value);
            e.target.value = "";
        }
    };

    const elemRef = useRef();

    useEffect(() => {
        // console.log("elemRef: ", elemRef.current);
        // console.log("scroll top: ", elemRef.current.scrollTop);
        // console.log("scroll height: ", elemRef.current.scrollHeight);
        // console.log("client height: ", elemRef.current.clientHeight);
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, []); // this runs only once when loading page, make it run every time the message array is changed

    //use map to loop over the messages
    return (
        <div>
            <h1>Chat Room</h1>
            <div className="chatmessages" ref={elemRef}>
                {chatMessages &&
                    chatMessages.map(message => {
                        return (
                            <div
                                key={message.messageid}
                                className="chatmessage"
                            >
                                <div className="avatar">
                                    <img
                                        src={message.avatarurl}
                                        alt={`{message.first} {message.last}`}
                                    />
                                </div>
                                <p>
                                    <b>
                                        {message.first} {message.last}
                                    </b>
                                    <i> {message.created_at}</i>
                                    <br />
                                    {message.message}
                                </p>
                            </div>
                        );
                    })}
            </div>
            <textarea
                placeholder="enter message here"
                onKeyDown={keyCheck}
            ></textarea>
        </div>
    );
}
