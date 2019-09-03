import React from "react";
import axios from "axios";

export default class Registration extends React.Component {
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
            .post("/registration", {
                first: this.state.first,
                last: this.state.last,
                email: this.state.email,
                password: this.state.password
            })
            .then(res => {
                if (res.data.message == "error") {
                    console.log(res.data.message);
                    this.setState({
                        first: "",
                        last: "",
                        email: "",
                        password: "",
                        error: "Whoops something went wrong. Please try again!"
                    });
                    console.log(this.state);
                } else {
                    location.replace("/");
                }
            })
            .catch(err => {
                console.log(err);
            });
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <p>{this.state.error}</p>
                <form>
                    <input
                        name="first"
                        placeholder="first"
                        onChange={this.handleChange}
                    />
                    <br />
                    <input
                        name="last"
                        placeholder="last"
                        onChange={this.handleChange}
                    />
                    <br />
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
                        Sign up
                    </button>
                </form>
            </div>
        );
    }
}
