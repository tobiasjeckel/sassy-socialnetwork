import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getFriendsWannabes,
    acceptFriendRequest,
    unfriend,
    viewFriendRequest
} from "./actions";

export default function Friends() {
    const friends = useSelector(state => {
        return (
            state.friendsWannabes &&
            state.friendsWannabes.filter(friend => friend.accepted == true)
        );
    });

    friends && console.log("friends: ", friends);

    const wannabes = useSelector(state => {
        return (
            state.friendsWannabes &&
            state.friendsWannabes.filter(friend => friend.accepted == false)
        );
    });

    wannabes && console.log("wannabes: ", wannabes);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFriendsWannabes());
        dispatch(viewFriendRequest());
    }, []);

    return (
        <div className="component">
            <h3>Friend Request Manager</h3>
            <div>
                {wannabes &&
                    wannabes.map(wannabe => {
                        return (
                            <div className="friendcard" key={wannabe.id}>
                                <div className="largeAvatar">
                                    <img
                                        src={wannabe.avatarurl}
                                        alt={`${wannabe.first} ${wannabe.last}`}
                                    />
                                </div>
                                <p>
                                    {wannabe.first} {wannabe.last}
                                </p>
                                <button
                                    value={wannabe.id}
                                    onClick={e =>
                                        dispatch(
                                            acceptFriendRequest(e.target.value)
                                        )
                                    }
                                >
                                    Accept friend request{" "}
                                </button>
                            </div>
                        );
                    })}
            </div>

            <br />

            <h3>These people are currently your friends</h3>
            <div>
                {friends &&
                    friends.map(friend => {
                        return (
                            <div className="friendcard" key={friend.id}>
                                <div className="largeAvatar">
                                    <img
                                        src={friend.avatarurl}
                                        alt={`${friend.first} ${friend.last}`}
                                    />
                                </div>
                                <p>
                                    {friend.first} {friend.last}
                                </p>
                                <button
                                    value={friend.id}
                                    onClick={e =>
                                        dispatch(unfriend(e.target.value))
                                    }
                                >
                                    Terminate from friends
                                </button>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
