import React, { useState, useEffect } from "react";
import axios from "./axios";

export function FriendButton(props) {
    let otherUser = props.match;

    const [buttonType, setButtonType] = useState({});
    const onClick = useHandleSubmit(buttonType, otherUser);

    useEffect(() => {
        console.log("id of profile that is being viewed: ", otherUser);
        axios
            .get(`/api/friendstatus/${otherUser}`)
            .then(res => {
                console.log(res);
                if (!res.data.receiver_id) {
                    setButtonType({
                        text: "Send friend request",
                        value: "sendfriendrequest"
                    });
                } else {
                    //setState
                    if (res.data.accepted) {
                        setButtonType({
                            text: "Unfriend",
                            value: "unfriend"
                        });
                    } else {
                        if (res.data.receiver_id == res.data.myId) {
                            console.log("render accept friend request");
                            setButtonType({
                                text: "Accept friend request",
                                value: "acceptfriendrequest"
                            });
                        } else {
                            console.log("render cancel friend request");
                            setButtonType({
                                text: "Cancel friend request",
                                value: "cancelfriendrequest"
                            });
                        }
                    }
                }
            })
            .catch(err => {
                console.log(err);
            });
    }, []); // check back later for infinite loop behaviour

    return (
        <div>
            <button onClick={onClick} name="friend">
                {buttonType.text}
            </button>
        </div>
    );
}

function useHandleSubmit(buttonType, otherUser) {
    const [setButtonType] = useState({});

    const onClick = () => {
        console.log(
            "friend button clicked with value and user id ",
            buttonType.value,
            otherUser
        );

        if (buttonType.value == "sendfriendrequest") {
            axios
                .post(`/api/sendfriendrequest/${otherUser}`)
                .then(res => {
                    console.log(res);
                    setButtonType("cancelfriendrequest");
                })
                .catch(err => {
                    console.log(err);
                });
        }

        //add more routes here
    };

    return onClick;
}
