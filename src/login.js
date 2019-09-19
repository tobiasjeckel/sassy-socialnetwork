import React from "react";
import axios from "./axios";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            error: ""
        };
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        axios
            .post("/login", {
                email: this.state.email,
                password: this.state.password
            })
            .then(res => {
                if (res.data.message == "error") {
                    // console.log(res.data.message);
                    this.handleError();
                    // console.log(this.state);
                } else {
                    location.replace("/");
                    console.log(res.data.message);
                    console.log(res.session.id);
                }
            })
            .catch(err => {
                console.log(err);
            });
        e.preventDefault();
    }

    handleError() {
        this.setState({
            error: true
        });
    }

    render() {
        return (
            <div className="component">
                {this.state.error && (
                    <h2>Ooops, something went wrong. Please try again!</h2>
                )}
                <form>
                    <input
                        type="email"
                        name="email"
                        placeholder="email"
                        onChange={this.handleChange}
                    />
                    <br />
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        onChange={this.handleChange}
                    />
                    <br />
                    <button onClick={this.handleSubmit} name="submit">
                        Log in
                    </button>
                </form>
            </div>
        );
    }
}
