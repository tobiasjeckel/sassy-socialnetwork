import { chatMessages, chatMessage } from "./actions"; //add chatMessage
import * as io from "socket.io-client";

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();
        socket.on("new-message-from-server", msg => {
            store.dispatch(chatMessage(msg));
        });

        socket.on("last-ten-messages", msgs => {
            store.dispatch(chatMessages(msgs));
        });
    }
};
