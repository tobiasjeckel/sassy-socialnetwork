import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFriendsWannabes, acceptFriendRequest, unfriend } from "./actions";

export default function Friends() {
    const friendsWannabes = useSelector(state => {
        // console.log("redux state: ", state);
        return state.friendsWannabes;
    });
    // const realfriends =
    //     friendsWannabes &&
    //     friendsWannabes.filter(friend => friend.accepted == true);
    //
    // realfriends && console.log(realfriends);

    const friends = useSelector(state => {
        return (
            state.friendsWannabes &&
            state.friendsWannabes.filter(friend => friend.accepted == true)
        );
    });

    friends && console.log(friends);

    const wannabes = useSelector(state => {
        return (
            state.friendsWannabes &&
            state.friendsWannabes.filter(friend => friend.accepted == false)
        );
    });

    wannabes && console.log(wannabes);

    // friendsWannabes &&
    //     console.log(
    //         "friends and wannabes back in friends.js is ",
    //         friendsWannabes
    //     );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFriendsWannabes());
    }, []);

    return (
        <div>
            <h1>My Friends </h1>
            <h2>These people are wannabes and want to be your friends</h2>
            <div>
                {wannabes &&
                    wannabes.map(wannabe => {
                        return (
                            <div key={wannabe.id}>
                                <img
                                    src={wannabe.avatarurl}
                                    alt={`${wannabe.first} ${wannabe.last}`}
                                />
                                <p>
                                    {wannabe.first} {wannabe.last}
                                </p>
                                <button>Accept friend request </button>
                            </div>
                        );
                    })}
            </div>

            <br />

            <h2>These people are currently your friends</h2>
            <div>
                {friends &&
                    friends.map(friend => {
                        return (
                            <div key={friend.id}>
                                <img
                                    src={friend.avatarurl}
                                    alt={`${friend.first} ${friend.last}`}
                                />
                                <p>
                                    {friend.first} {friend.last}
                                </p>
                                <button>Terminate from friends</button>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
