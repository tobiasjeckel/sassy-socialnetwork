import React from "react";

export default function Avatar(props) {
    let avatarurl = props.avatarurl || "/assets/defaultuser.png";
    let fullName = props.first + " " + props.last;
    return (
        <div className="avatar">
            <img onClick={props.showModal} src={avatarurl} alt={fullName} />
        </div>
    );
}
