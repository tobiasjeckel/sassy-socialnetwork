import React from "react";

export default function Avatar(props) {
    // console.log("avatarurl: ", props.avatarurl);
    let avatarurl = props.avatarurl || "/assets/defaultuser.png";
    // let fullName = { ...props.first, ...props.last };
    let fullName = props.first + " " + props.last;
    // console.log(fullName);
    return (
        <div>
            <img onClick={props.showModal} src={avatarurl} alt={fullName} />
        </div>
    );
}
