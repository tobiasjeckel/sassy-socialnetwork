import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFriends } from "./actions";

export default function Friends() {
    const friends = useSelector(state => {
        // console.log("redux state: ", state);
        return state.friends;
    });

    console.log("friends is ", friends);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFriends());
    }, []);

    return (
        <div>
            <h1>My Friends </h1>
            {friends &&
                friends.map((friend, index) => {
                    return <p key={index}>{friend.name}</p>;
                })}
        </div>
    );
}
