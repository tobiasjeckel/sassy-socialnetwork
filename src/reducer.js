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
        state = {
            ...state,
            friendsWannabes: state.friendsWannabes.map(fw => {
                if (fw.id === action.id) {
                    return {
                        ...fw,
                        accepted: true
                    };
                } else {
                    return fw;
                }
            })
        };
    }

    if (action.type === "UNFRIEND") {
        state = {
            ...state,
            friendsWannabes: state.friendsWannabes.filter(fw => {
                return fw.id != action.id;
            })
        };
    }
    return state;
}
