import React from "react";
import axios from "./axios";
import Avatar from "./avatar";
import Uploader from "./uploader";
import Logo from "./logo";
import Profile from "./profile";
import { OtherProfile } from "./otherprofile";
import { BrowserRouter, Route, Link } from "react-router-dom";
import FindPeople from "./findpeople";
import Friends from "./friends";

export class App extends React.Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: false
        };
        this.getUser = this.getUser.bind(this);
        this.showModal = this.showModal.bind(this);
        this.setAvatarUrl = this.setAvatarUrl.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.setBio = this.setBio.bind(this);
        this.componentDidMount = this.componentDidMount(this);
    }

    componentDidMount() {
        this.getUser();
    }

    getUser() {
        axios.get("/api/myuser", {}).then(res => {
            this.setState({
                first: res.data.first,
                last: res.data.last,
                avatarurl: res.data.avatarurl,
                bio: res.data.bio
            });
        });
    }

    showModal() {
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
    setBio(biotext) {
        this.setState({ bio: biotext });
    }

    render() {
        return (
            <BrowserRouter>
                <div>
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
                            <div>
                                <h3>
                                    <Link to={`/users`}>Meet new people</Link>
                                </h3>
                            </div>
                            <div>
                                <h3>
                                    <Link to={`/friends`}>My Friends</Link>
                                </h3>
                            </div>
                            <div>
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
                    </div>
                    <div>
                        <Route
                            exact
                            path="/"
                            render={() => (
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
                            )}
                        />
                    </div>
                    <div>
                        <Route path="/user/:id" component={OtherProfile} />
                    </div>
                    <div>
                        <Route exact path="/users" component={FindPeople} />
                    </div>
                    <div>
                        <Route path="/friends" component={Friends} />
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}
