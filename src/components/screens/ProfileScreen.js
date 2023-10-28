import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProfileScreen.css';
import {useNavigate} from "react-router-dom";

const ProfileScreen = () => {

    const history = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {

        if (!localStorage.getItem("authToken")){
            history('/login');
        }
        const fetchPrivateData = async () => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            };

            try {
                const { data } = await axios.get("/api/private", config);
                setUsername(data.username);
                setEmail(data.email);
            } catch (error) {
                console.log(error);
            }
        };

        fetchPrivateData();
    }, []);

    const changeUsernameHandler = async (e) => {
        e.preventDefault();

        // Implementirajte logiku za promenu korisničkog imena
    };

    const changePasswordHandler = async (e) => {
        e.preventDefault();

        // Implementirajte logiku za promenu lozinke
    };

    return (
        <div className="profile-container">
            <div className="profile-content">
                <h1 className="profile-title">Profile Page</h1>

                <div className="information">
                    <div className="profile-info">
                        <h2>Username: {username}</h2>
                        <h2>Email: {email}</h2>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProfileScreen;