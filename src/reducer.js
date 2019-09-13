//reducer.js

export default function reducer(state = {}, action) {
    if (action.type === "ACTION_THAT_WILL_CHANGE_A_THING") {
        //then change redux state (immutably)
    }
    if (action.type === "GET_FRIENDS") {
        // console.log("GET_FRIENDS in reducers: ", action);
        state = {
            ...state,
            friends: action.friends
        };
    }
    // console.log(state); //this part should also be in dev tools
    return state;
}
