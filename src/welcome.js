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
                <img src="https://3exggn92n2of0r1b3yma3xva-wpengine.netdna-ssl.com/wp-content/uploads/2011/01/Myspace-everything-pr.gif" />
                <Registration />
            </div>
        );
    }
}
