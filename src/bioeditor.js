import React from "react";

export class BioEditor extends React.Component {
    constructor() {
        super();
        this.state = {
            editMode: false
        };
    }
    componentDidMount() {
        console.log("BioEditor mounted");
    }
    render() {
        let elem = (
            <div>
                {this.props.bio} <button>Edit</button>
            </div>
        );
        if (this.state.editMode) {
            elem = (
                <div>
                    <textarea>
                        {" "}
                        <button>Save</button>{" "}
                    </textarea>
                </div>
            );
        } else if (!this.props.bio) {
            elem = "";
        }
        return elem;
    }
}
