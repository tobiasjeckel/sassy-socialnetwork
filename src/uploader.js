import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor() {
        super();
        this.state = { file: null };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    render() {
        return (
            <div>
                <h1 onClick={this.props.hideModal}>X</h1>
                <h3>Upload your profile picture here!</h3>
                <form>
                    <input
                        id="fileinput"
                        onChange={this.handleChange}
                        name="file"
                        type="file"
                        accept="image/*"
                    ></input>
                    <button onClick={this.handleClick}>submit</button>
                </form>
            </div>
        );
    }

    handleClick(e) {
        e.preventDefault();
        // console.log("this: ", this);
        var formData = new FormData();
        formData.append("file", this.state.file);
        axios
            .post("/uploadAvatar", formData)
            .then(res => {
                // console.log(res);
                // document.getElementById("fileinput").value = ""; //clear file input field
                this.props.setAvatarUrl(res.data.avatarurl); //write this in app.js
            })
            .then(() => {
                this.props.hideModal();
            })
            .catch(err => {
                console.log("err in post: ", err);
            });
    }

    handleChange(e) {
        this.setState({ file: e.target.files[0] });
    }
}
