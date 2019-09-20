import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default function FindPeople() {
    const [input, setInput] = useState();
    const [users, setUsers] = useState();
    const [newUsers, setNewUsers] = useState();

    const handleInputChange = e => {
        setInput(e.target.value);
    };

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
    }, [users]);

    return (
        <div className="component">
            <h1>Find People</h1>
            <input
                type="text"
                name="peopleinput"
                placeholder="Enter name"
                onChange={handleInputChange}
            />
            <br />
            <div>
                <br />
                {users &&
                    users.map(user => (
                        <div key={user.id} className="friendcard">
                            <div className="largeAvatar">
                                <Link to={`/user/${user.id}`}>
                                    <img
                                        src={user.avatarurl}
                                        alt={`${user.first} ${user.last}`}
                                    />
                                </Link>
                            </div>
                            <p>
                                {user.first} {user.last}
                            </p>
                        </div>
                    ))}
            </div>
            <div>
                {!users && newUsers && (
                    <div>
                        <h2>Check out the new users on MySpace</h2>
                        {newUsers.map(user => (
                            <div key={user.id} className="friendcard">
                                <div className="largeAvatar">
                                    <Link to={`/user/${user.id}`}>
                                        <img
                                            src={user.avatarurl}
                                            alt={`${user.first} ${user.last}`}
                                        />
                                    </Link>
                                </div>
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
