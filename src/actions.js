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

export function acceptFriendRequest() {
    return axios.get("/api/acceptfriendrequest/:id").then(({ data }) => {
        //todo: add props to id
        return {
            type: "ACCEPT_FRIEND_REQUEST",
            id: data //id of the user whose friendship was accepted
        };
    });
}

export function unfriend() {
    return axios.get("api/unfriend:id").then(({ data }) => {
        //todo: add props to id
        return {
            type: "UNFRIEND",
            id: data //id of the user whose friendship was ended
        };
    });
}
