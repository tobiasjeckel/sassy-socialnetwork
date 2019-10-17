import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import axios from "./axios";
import { FriendButton } from "./friendbutton";

jest.mock("./axios");

test("when page renders, the send friend request button renders after axios request returns that there is no relationship between viewer and owner, e.g. res.data.receiver_id not part of data", async () => {
    axios.get.mockResolvedValue({
        data: { myId: 1 }
    });

    const { container } = render(<FriendButton match={2} />);

    const elem = await waitForElement(() => container.querySelector("button"));
    console.log(elem.innerHTML);
    expect(elem.innerHTML).toBe("Send friend request");
});
