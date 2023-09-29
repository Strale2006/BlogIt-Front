import {useState, useEffect} from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import './PrivateScreen.css';
import {Link} from 'react-router-dom';



const PrivateScreen = () =>{

    console.log("PrivateScreen is rendered");

    const history = useNavigate();

    const [error, setError] = useState("");
    const [privateData, setPrivateData] = useState("");
    const [isVerified, setIsVerified] = useState(false);


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
                setPrivateData(data);
                setIsVerified(data.isVerified);
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
        <div className="verification-screen">
            <form className="verification-screen_form">
                {error && <span className="error-message">{error}</span>}
                {!isVerified && <span className="error-message">Please verify your email. <Link to="/sendVerificationEmail">Send verification email</Link></span>}

                
                <img src="/SentMail.png" className="verification-screen__logo" alt="Sent Mail"/>
                <h3 className="verification-screen__title">Hi, {privateData.username}</h3>
                <h3 className="verification-screen__title">Verify your email address</h3>
                <span className="verification-screen__subtext">Please verify this email address by clicking the button below</span>



                <button type="submit" className="verification-button">Verify your email</button>

                <span className="verification-screen__subtext">
                    <button onClick={logoutHandler} className="subtext-link">Logout</button>
                </span>

            </form>
        </div>
    );
};

export default PrivateScreen;
