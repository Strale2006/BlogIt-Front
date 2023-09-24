import {useState, useEffect} from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import './PrivateScreen.css';


const PrivateScreen = () =>{

    console.log("PrivateScreen is rendered");

    const history = useNavigate();

    const [error, setError] = useState("");
    const [privateData, setPrivateData] = useState("");

    useEffect(() => {
        if(!localStorage.getItem("authToken")){
            history("/login");
        }

        const fetchPrivateData = async () => {

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            }

            try {
                const {data} = await axios.get("/api/private", config);
                setPrivateData(data.data);
            }catch (e) {
                localStorage.removeItem("authToken");
                setError("You are not authorized, please login");
            }
        }

        fetchPrivateData().then().catch(error => {
            console.log("Error:", error);
        });
    }, [history]);

    const logoutHandler = () => {
        localStorage.removeItem("authToken");
        history("/login");
    }

    return (
        <div className={`private-screen ${error ? "error" : ""}`}>
            <div className="private-screen__header">
                <img src="/SentMail.png" className="private-screen__logo" alt="Sent Mail"/>
                <h1 className="private-screen__title">Verify your email address</h1>
                <h4 className="private-screen__subtext">Please verify this email address by clicking the button below</h4>
                <button className="verification-button">Verify your email</button>
            </div>

            <div className="private-screen__footer">
                <button onClick={logoutHandler} className="private-screen__logout-button">
                     Logout
                </button>
            </div>
        </div>
    );
};

export default PrivateScreen;
