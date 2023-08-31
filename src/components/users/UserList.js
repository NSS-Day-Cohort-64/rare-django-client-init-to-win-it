import { useState, useEffect } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { getAllUsers } from "../../managers/UserManager"
import "./users.css";

export const UserList = () => {
    // State to store users
    const [users, setUsers] = useState([]);

    // Fetch users when the component mounts
    useEffect(() => {
        getAllUsers()
            .then((userData) => setUsers(userData))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div className="user-page-container">
            <h1 className="user-page-header">User Management</h1>
            <div className="user-user-container">
                <div className="user-left-side">
                    <ul className="user-list">
                        {users.map((user) => (
                            <li key={user.id} className="user-list-items">
                                <div className="user-list-name">Username: {user.username}</div>
                                <div className="user-list-name">Name: {`${user.first_name} ${user.last_name}`}</div>
                                <div className="user-list-name">Email: {user.email}</div>
                                <div className="user-profile">
                                    <button className="user-profile-button">
                                        <Link to={`/users/${user.id}`}>View Profile</Link>
                                    </button>{" "}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
