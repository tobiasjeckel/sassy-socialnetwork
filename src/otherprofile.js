import React from "react";
import axios from "./axios";
import { FriendButton } from "./friendbutton";

export class OtherProfile extends React.Component {
    constructor() {
        super();
        this.getOtherUser = this.getOtherUser.bind(this);
        this.state = {};
    }
    componentDidMount() {
        this.getOtherUser();
    }

    getOtherUser() {
        let otherUser = this.props.match.params.id;
        axios.get("/api/user/" + otherUser).then(res => {
            if (res.data.message === "error" || res.data.id === res.data.myId) {
                this.props.history.replace("/");
            } else {
                this.setState({
                    first: res.data.first,
                    last: res.data.last,
                    avatarurl: res.data.avatarurl,
                    bio: res.data.bio
                });
            }
        });
    }

    render() {
        let fullName = this.state.first + " " + this.state.last;
        return (
            <div>
                <h1>
                    Profile of {this.state.first} {this.state.last}
                </h1>
                <br />
                <p>{this.state.bio}</p>
                <br />
                <img src={this.state.avatarurl} alt={fullName} />
                <br />
                <FriendButton match={this.props.match.params.id} />
            </div>
        );
    }
}
