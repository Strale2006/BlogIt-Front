import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Link} from 'react-router-dom';
import "./LoginScreen.css";

import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/actions';

const LoginScreen = () => {

    const history = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const dispatch = useDispatch();




    useEffect(() => {
        
    }, [history]);


    const loginHandler = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        try {
            const {data} = await axios.post(
                "/api/auth/login",
                {email, password},
                config
            );
            const { user } = data;
            console.log(user)

            dispatch(setUser({ 
                username: user.username,
                password: user.password,
                email: user.email,
                tasks: user.tasks
            }));
            localStorage.setItem('userData', JSON.stringify(data.user));
            localStorage.setItem("authToken", data.token);
            

            history("/");
        }catch (e){
            setError(e.response.data.error);
            setTimeout(()=>{
                setError("");
            }, 5000)
        }
    }

    return (
        <div className="login-screen">
            <form onSubmit={loginHandler} className="login-screen_form">
                <h3 className="login-screen__title">Log In</h3>
                {error && <span className="error-message">{error}</span>}

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input className="login--input" type="email" required id="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input className="login-input" type="password" required id="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <span className="login-screen__subtext">
                         <Link className="subtext-link" to="/forgotpassword">Forgot Password?</Link>
                    </span>
                </div>

                <button type="submit" className="login-button">LOGIN</button>

                <span className="login-screen__subtext">
                    Don't have an account? <Link className="subtext-link" to="/register">Register</Link>
                </span>

            </form>
        </div>
    )

};

export default LoginScreen;