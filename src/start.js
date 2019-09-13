import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
// import Logo from "./logo";
import { App } from "./app.js";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducer";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

let elem;

if (location.pathname == "/welcome") {
    //user is not logged in
    elem = <Welcome />;
} else {
    //user is logged in
    elem = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

ReactDOM.render(elem, document.querySelector("main"));

//elem = <img src="assets/under-construction.gif" />;
