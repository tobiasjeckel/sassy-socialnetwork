import React from "react";
import axios from "./axios";
import { render, fireEvent } from "@testing-library/react";

// test("When no bio is passed to it, an 'add' button is rendered", () => {
//     const { container } = render(
//         <div>
//             <h2>Tell us something about yourself 😀</h2>
//             <button onClick={this.editMode}>Add Bio</button>
//         </div>
//     );
//     expect(container.querySelector("button").innerText.toBe("Add Bio"));
// });
