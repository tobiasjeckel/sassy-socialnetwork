import { chatMessages, chatMessage } from "./actions";
import * as io from "socket.io-client";

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();
        socket.on("message from server", msg => {
            console.log(`
                received msg from server. now just start redux stuff and dispatch it an action. message: ${msg}
                `);
        });
        //redux stuff

        //
        socket.on("chatMessages", msgs => store.dispatch(chatMessages(msgs)));

        socket.on("chatMessage", msg => store.dispatch(chatMessage(msg)));
    }
};

// 2 actions and 2 reducers
