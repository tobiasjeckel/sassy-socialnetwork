import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function FindPeople() {
    const [input, setInput] = useState();
    const [users, setUsers] = useState();

    const handleInputChange = e => {
        setInput(e.target.value);
    };
    const handleUserChange = e => {
        setUsers(console.log(e));
    };
    console.log("input is: ", input);
    console.log("response is: ", users);

    useEffect(() => {
        let ignore = false;
        (async () => {
            const { data } = await axios.get(`/api/users/?q=${input}`);
            if (!ignore) {
                setUsers(data);
            } else {
                console.log("IGNORED");
            }
        })();
        return () => {
            ignore = true;
        };
    }, [input]);

    return (
        <div>
            <h1>Find People</h1>
            <input
                type="text"
                name="peopleinput"
                placeholder="Enter name"
                onChange={handleInputChange}
            />
            <br />
            <div>
                {users &&
                    users.map(user => (
                        <div key={user.id}>
                            <img src={user.avatarurl} />
                            <p>
                                {user.first} {user.last}{" "}
                            </p>
                        </div>
                    ))}
            </div>
        </div>
    );
}
