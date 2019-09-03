import React from "react";
import axios from "axios";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this); //importan, always has to be done to bind "this" to the class so this doesnt refer to the global object. is solution to error "cannon read property of setState is undefined"
    }

    handleChange(e) {
        //this.setState to PUT information in state
        // console.log("e.target.name", e.target.name);
        this.setState(
            {
                [e.target.name]: e.target.value //not an array but a way of telling object that e.target.name is a variable
            },
            () => console.log(this.state)
        );
    }

    handleSubmit(e) {
        e.preventDefault();
        axios
            .post(
                "/registration/",
                this.target.first,
                this.target.last,
                this.target.email,
                this.target.password
            )
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div>
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
                    <button name="submit" value="submit" />
                </form>
            </div>
            //onChange = {e => this.handleChange}, if using an arrow function then this is binded to the class and it works
            //make an axios request when button is clicked
        );
    }
}
