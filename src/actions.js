//actions.js
import axios from "./axios";

export function example() {
    return {
        type: "ACTION_THAT_WILL_CHANGE_A_THING"
    };
}

export function getFriendsWannabes() {
    return axios.get("/api/friendswannabes").then(({ data }) => {
        // console.log(
        //     "*** logging data of friendswannabes res in action.js: ",
        //     data
        // );
        return {
            type: "GET_FRIENDS_WANNABES",
            friendsWannabes: data
        };
    });
}

export function acceptFriendRequest(otherUser) {
    console.log("accept friend request for user with id: ", otherUser);
    return axios
        .post(`/api/acceptfriendrequest/${otherUser}`)
        .then(({ data }) => {
            return {
                type: "ACCEPT_FRIEND_REQUEST",
                id: data.sender_id //id of the user whose friendship was accepted
            };
        });
}

export function unfriend(otherUser) {
    console.log("terminate friendship for user with id: ", otherUser);

    return axios.post(`api/unfriend/${otherUser}`).then(() => {
        return {
            type: "UNFRIEND",
            id: otherUser //id of the user whose friendship was ended
        };
    });
}

export function chatMessages(chatMessages) {
    return {
        type: "GET_LAST_TEN_MESSAGES",
        chatMessages
    };
}

export function chatMessage(chatMessage) {
    console.log("chat message in action: ", chatMessage);
    return {
        type: "NEW_MESSAGE",
        chatMessage
    };
}
