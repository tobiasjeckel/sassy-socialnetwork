import React from "react";

export default function Avatar(props) {
    console.log("avatarurl: ", props.avatarurl);
    let avatarurl = props.avatarurl || "/assets/defaultuser.png";
    // let fullName = { ...props.first, ...props.last };
    let fullName = props.first + " " + props.last;
    console.log(fullName);
    return (
        <div>
            <h2>
                I am a myspace user. My name is: {props.first} {props.last}
            </h2>
            <img onClick={props.showModal} src={avatarurl} alt={fullName} />
        </div>
    );
}
