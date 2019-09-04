import React from "react";
import Registration from "./registration";
import Login from "./login";
import { HashRouter, Route, Link } from "react-router-dom";

export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <HashRouter>
                <div>
                    <h1>Welcome to Myspace!</h1>
                    <img src="https://3exggn92n2of0r1b3yma3xva-wpengine.netdna-ssl.com/wp-content/uploads/2011/01/Myspace-everything-pr.gif" />
                    <div>
                        <Route exact path="/" component={Registration} />
                        <Route path="/login" component={Login} />
                        <Route exact path="/" component={this.LoginLink} />
                        <Route
                            exact
                            path="/login"
                            component={this.RegistrationLink}
                        />
                    </div>
                </div>
            </HashRouter>
        );
    }
    LoginLink() {
        return <Link to="/login">Already a member? Please log in</Link>;
    }
    RegistrationLink() {
        return <Link to="..">Don&apos;t have an account? Please register</Link>;
    }
}
