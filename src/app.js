import React from "react";
import axios from "./axios";
import Avatar from "./avatar";
import Uploader from "./uploader";
import Logo from "./logo";
import Profile from "./profile";
// import { Link } from "react-router-dom";

export class App extends React.Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: false,
            avatarurl: ""
        };
        this.getUser = this.getUser.bind(this);
        this.showModal = this.showModal.bind(this);
        this.setAvatarUrl = this.setAvatarUrl.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    componentDidMount() {
        console.log("App mounted!");
        this.getUser();
        //make an axios request to server, it will do a dbquery to find out info from user
        //use the id stored in cookie to do the lookup
        //when we have the info we can add it to state using setState
    }

    getUser() {
        axios.get("/user", {}).then(res => {
            this.setState({
                first: res.data.first,
                last: res.data.last,
                avatarurl: res.data.avatarurl
            });
        });
    }

    showModal() {
        console.log("show modal is running");
        this.setState({
            uploaderIsVisible: true
        });
    }

    hideModal() {
        //hide the modal
        this.setState({
            uploaderIsVisible: false
        });
    }

    setAvatarUrl(avatarurl) {
        this.setState({
            avatarurl: avatarurl
        });
    }

    // logOutLink() {
    //     return <Link to="/logout">Log out</Link>;
    // }

    render() {
        return (
            <div>
                <div className="header">
                    <div className="logo">
                        <Logo />
                    </div>
                    <div className="logout">
                        <h3>
                            <a href="/logout">Log out</a>
                        </h3>
                    </div>
                    <div className="avatar">
                        <Avatar
                            first={this.state.first}
                            last={this.state.last}
                            avatarurl={this.state.avatarurl}
                            showModal={this.showModal}
                        />
                    </div>
                </div>
                <div>
                    {this.state.uploaderIsVisible && (
                        <Uploader
                            setAvatarUrl={this.setAvatarUrl}
                            hideModal={this.hideModal}
                        />
                    )}
                </div>
                <div>
                    <Profile
                        id={this.state.id}
                        first={this.state.first}
                        last={this.state.last}
                        avatarurl={this.state.avatarurl}
                        showModal={this.showModal}
                        bio={this.state.bio}
                        setBio={this.setBio}
                    />
                </div>
            </div>
        );
    }
}
