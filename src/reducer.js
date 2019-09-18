//reducer.js

export default function reducer(state = {}, action) {
    if (action.type === "GET_FRIENDS_WANNABES") {
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

    if (action.type === "GET_LAST_TEN_MESSAGES") {
        state = {
            ...state,
            chatMessages: action.chatMessages
        };
    }

    if (action.type === "NEW_MESSAGE") {
        state = {
            ...state,
            chatMessages: [...state.chatMessages, action.chatMessage]
        };
    }

    //to-do fix this
    if (action.type === "NEW_FRIEND_REQUEST_FROM_ID") {
        state = {
            ...state,
            openFriendRequests: [...state.openFriendRequests, action.userId]
        };
    }

    return state;
}
