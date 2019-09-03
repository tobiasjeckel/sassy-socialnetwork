import React from "react";
import Registration from "./registration";

export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Welcome to Myspace!</h1>
                <p>Large logo of the site</p>
                <Registration />
            </div>
        );
    }
}
