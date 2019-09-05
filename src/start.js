import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
// import Logo from "./logo";
import { App } from "./app.js";

let elem;

if (location.pathname == "/welcome") {
    //user is not logged in
    elem = <Welcome />;
} else {
    //user is logged in
    elem = <App />;
}

ReactDOM.render(elem, document.querySelector("main"));

//elem = <img src="assets/under-construction.gif" />;
