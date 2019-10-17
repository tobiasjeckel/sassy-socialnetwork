import React from "react";
import axios from "./axios";

export class BioEditor extends React.Component {
    constructor() {
        super();
        this.state = {
            editMode: false
        };
        this.editMode = this.editMode.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.hideEdit = this.hideEdit.bind(this);
    }
    componentDidMount() {}
    editMode(e) {
        e.preventDefault(e);
        this.setState({
            editMode: true
        });
    }

    handleClick(e) {
        e.preventDefault(e);
        axios
            .post("/editBio", {
                bio: this.state.bio
            })
            .then(res => {
                //push up to app
                console.log("the entered bio is: ", res.data.bio);
                this.props.setBio(res.data.bio);
                document.getElementById("bioedit").value = ""; //clear file input field
            })
            .then(() => {
                this.hideEdit();
            })
            .catch(err => {
                console.log(err);
            });
    }

    hideEdit() {
        this.setState({
            editMode: false
        });
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        let elem = (
            <div>
                <p>{this.props.bio}</p>
                <button onClick={this.editMode}>Edit Bio</button>
            </div>
        );
        if (this.state.editMode) {
            elem = (
                <div>
                    <h2>Type here to edit your bio</h2>
                    <textarea
                        name="bio"
                        id="bioedit"
                        placeholder=""
                        onChange={this.handleChange}
                    ></textarea>
                    <button onClick={this.handleClick}>Save</button>
                </div>
            );
            return elem;
        } else if (!this.props.bio) {
            elem = (
                <div>
                    <h2>Tell us something about yourself 😀</h2>
                    <button onClick={this.editMode}>Add Bio</button>
                </div>
            );
        }
        return elem;
    }
}
