//reducer.js

export default function reducer(state = {}, action) {
    if (action.type === "GET_FRIENDS_WANNABES") {
        // console.log("GET_FRIENDS in reducers: ", action);
        state = {
            ...state,
            friendsWannabes: action.friendsWannabes
        };
    }

    if (action.type === "ACCEPT_FRIEND_REQUEST") {
        //do so the clone should have all the properties of the old state except one of the objects in the friendsWannabes array should have their accepted property set to true
    }

    if (action.type === "UNFRIEND") {
        // should clone the global state, and the clone should have all the properties of the old state except the user whose friendship was ended should be removed from the friendsWannabes array.
    }
    // console.log("the current state in redux is: ", state); //this part should also be in dev tools
    return state;
}
