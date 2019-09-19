//actions.js
import axios from "./axios";

export function example() {
    return {
        type: "ACTION_THAT_WILL_CHANGE_A_THING"
    };
}

export function getFriendsWannabes() {
    return axios.get("/api/friendswannabes").then(({ data }) => {
        return {
            type: "GET_FRIENDS_WANNABES",
            friendsWannabes: data
        };
    });
}

export function acceptFriendRequest(otherUser) {
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
    return {
        type: "NEW_MESSAGE",
        chatMessage
    };
}

export function openFriendRequests(id) {
    return {
        type: "NEW_FRIEND_REQUEST_FROM_ID",
        id
    };
}
