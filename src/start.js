import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import Logo from "./logo";

let elem;

if (location.pathname == "/welcome") {
    //user is not logged in
    elem = <Welcome />;
} else {
    //user is logged in
    elem = <Logo />;
}

ReactDOM.render(elem, document.querySelector("main"));

//elem = <img src="assets/under-construction.gif" />;
