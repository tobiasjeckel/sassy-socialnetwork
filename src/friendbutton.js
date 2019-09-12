import React, { useState, useEffect } from "react";
import axios from "./axios";

export function FriendButton(props) {
    let otherUser = props.match;

    const [buttonType, setButtonType] = useState({});
    // const onClick = useHandleSubmit(buttonType, otherUser);

    useEffect(() => {
        console.log("id of profile that is being viewed: ", otherUser);
        axios
            .get(`/api/friendstatus/${otherUser}`)
            .then(res => {
                // console.log(res);
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
    }, []);

    const onClick = () => {
        console.log(
            "friend button clicked with value and user id ",
            buttonType.value,
            otherUser
        );

        //send friend request route
        if (buttonType.value == "sendfriendrequest") {
            axios
                .post(`/api/sendfriendrequest/${otherUser}`)
                .then(res => {
                    console.log(
                        "friend request sent for receiver_id: ",
                        res.data.receiver_id
                    );
                    setButtonType({
                        text: "Cancel friend request",
                        value: "cancelfriendrequest"
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        }

        //cancel friend request route
        if (buttonType.value == "cancelfriendrequest") {
            axios
                .post(`/api/cancelfriendrequest/${otherUser}`)
                .then(res => {
                    console.log(
                        "friend request deleted for receiver_id: ",
                        res.data.receiver_id
                    );
                    setButtonType({
                        text: "Send friend request",
                        value: "sendfriendrequest"
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        }

        //accept friend request route
        if (buttonType.value == "acceptfriendrequest") {
            axios
                .post(`/api/acceptfriendrequest/${otherUser}`)
                .then(res => {
                    console.log(
                        "accepted friend request of user: ",
                        res.data.sender_id
                    );
                    setButtonType({
                        text: "Unfriend",
                        value: "unfriend"
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        }

        //unfriend route
        if (buttonType.value == "unfriend") {
            axios
                .post(`/api/unfriend/${otherUser}`)
                .then(res => {
                    console.log("unfriended user: ", res);
                    setButtonType({
                        text: "Send friend request",
                        value: "sendfriendrequest"
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };

    return (
        <div>
            <button onClick={onClick} name="friend">
                {buttonType.text}
            </button>
        </div>
    );
}

// function useHandleSubmit(buttonType, otherUser) {
//     const [setButtonType] = useState({});
//
//     const onClick = () => {
//         console.log(
//             "friend button clicked with value and user id ",
//             buttonType.value,
//             otherUser
//         );
//
//         if (buttonType.value == "sendfriendrequest") {
//             axios
//                 .post(`/api/sendfriendrequest/${otherUser}`)
//                 .then(res => {
//                     console.log(res);
//                     setButtonType("cancelfriendrequest");
//                 })
//                 .catch(err => {
//                     console.log(err);
//                 });
//         }
//
//         //add more routes here
//     };
//
//     return onClick;
// }
