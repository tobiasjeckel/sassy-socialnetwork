import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";

let elem;

if (location.pathname == "/welcome") {
    //user is not logged in
    elem = <Welcome />;
} else {
    //user is logged in
    elem = <p>my cool under construction logo</p>;
}

ReactDOM.render(elem, document.querySelector("main"));
