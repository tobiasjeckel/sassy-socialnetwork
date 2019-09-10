import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function FindPeople() {
    const [input, setInput] = useState();
    const [users, setUsers] = useState();
    const [newUsers, setNewUsers] = useState();

    const handleInputChange = e => {
        setInput(e.target.value);
    };

    console.log("search response is: ", users);
    console.log("newUser response is: ", newUsers);

    //display users that are searched for
    useEffect(() => {
        let ignore = false;
        (async () => {
            if (input) {
                setNewUsers(null);
                const { data } = await axios.get(`/api/users/?q=${input}`);
                if (!ignore) {
                    setUsers(data);
                } else {
                    console.log("IGNORED");
                }
            } else {
                setUsers(null);
            }
        })();
        return () => {
            ignore = true;
        };
    }, [input]);

    //new users to show as default
    useEffect(() => {
        let ignore = false;
        (async () => {
            const { data } = await axios.get(`/api/newusers`);
            if (!ignore) {
                setNewUsers(data);
            } else {
                console.log("IGNORED");
            }
        })();
        return () => {
            ignore = true;
        };
    }, []);

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
            <div>
                {!users && newUsers && (
                    <div>
                        <h2>Check out the new users on MySpace</h2>
                        {newUsers.map(user => (
                            <div key={user.id}>
                                <img src={user.avatarurl} />
                                <p>
                                    {user.first} {user.last}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
