//actions.js
import axios from "./axios";

export function example() {
    return {
        type: "ACTION_THAT_WILL_CHANGE_A_THING"
    };
}

export function getFriends() {
    return axios.get("/api/friends").then(({ data }) => {
        return {
            type: "GET_FRIENDS",
            friends: data
        };
    });
}
