import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";

let elem;

if (location.pathname == "/welcome") {
    //user is not logged in
    elem = <Welcome />;
} else {
    //user is logged in
    elem = (
        <img src="https://cdn.vox-cdn.com/thumbor/yQidk0r257q3yR9mQvZEQQnNInE=/800x0/filters:no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/8688491/hiE5vMs.gif" />
    );
}

ReactDOM.render(elem, document.querySelector("main"));
