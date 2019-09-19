import React from "react";
import Avatar from "./avatar";
import { BioEditor } from "./bioeditor";

export default function Profile({
    id,
    first,
    last,
    avatarurl,
    showModal,
    bio,
    setBio
}) {
    return (
        <div className="component">
            <h1>
                Hi {first} {last}!
            </h1>
            <div className="largeAvatar">
                <Avatar
                    first={first}
                    last={last}
                    avatarurl={avatarurl}
                    showModal={showModal}
                />
            </div>
            <BioEditor bio={bio} setBio={setBio} />
        </div>
    );
}

//Profile pic is bigger here
