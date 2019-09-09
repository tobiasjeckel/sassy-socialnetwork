import React from "react";

export class OtherProfile extends React.Component {
    constructor() {
        super();
    }
    componentDidMount() {
        console.log("otherprofile mounted");
        //make axis request to server to get info about us who's page we're on
        //we'll get the id of the person who's page we're on by doing this.props.match.params.id
        //when we get response from server, we need to store that info about the user whose page we're on in state
        //once that info is in state, render it onscreen
        //if you're logged in as user 7 and you go to /user/7, you should be redirected back to the / route
        //this.props.history.push('/'); is how to trigger that redirect back to / route
        //if user tries to navigate to page of a user who doesn't exist (for example, user tries to go to /user/1928371 but user 1928371 does not exist), you should either: a. render an error message b. redirect back to /
    }
}
