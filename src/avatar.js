import React from "react";

export default function Avatar(props) {
    console.log("imageurl: ", props.imageurl);
    let imageurl = props.imageurl || "/assets/defaultuser.png";
    return (
        <div>
            <h2>
                I am the avatar component. My name is: {props.first}{" "}
                {props.last}
            </h2>
            <img onClick={props.showModal} src={imageurl} />
        </div>
    );
}
