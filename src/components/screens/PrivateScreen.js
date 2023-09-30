import {useState, useEffect} from "react";
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";
import './PrivateScreen.css'
import '../../index.css'



const PrivateScreen = () =>{

    console.log("PrivateScreen is rendered");

    const history = useNavigate();

    const [error, setError] = useState("");
    const [privateData, setPrivateData] = useState("");
    const [isVerified, setIsVerified] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskTitle, setTaskTitle] = useState("");
    const [tasks, setTasks] = useState([]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleInputChange = (event) => {
        setTaskTitle(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setTasks([...tasks, taskTitle]);
        setTaskTitle("");
        closeModal();
    };

    const handleDelete = (index) => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    };

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
                console.log(data.isVerified);
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

    const lordIconStyle = {
        width: "30px",
        height: "30px",
    }

    return (
        <div className="to-do__screen">
            {error && <span className="error-message">{error}</span>}
            {isVerified===false && <span className="error-message">Please verify your email. <Link to="/sendVerificationEmail">Send verification email</Link></span>}


            <h1>Website To-Do</h1>
            <h2 className="verification-screen__title">Hi, {privateData.username}</h2>

            <div className="content">

                <div className="header">
                    <h1>TO-DO</h1>
                </div>
                <div className="task-container">

                    {tasks.map((task, index) => (
                        <div className='task' key={index}>
                            <h1>{task}</h1>
                            <lord-icon
                                src="https://cdn.lordicon.com/exkbusmy.json"
                                trigger="click"
                                colors="outline:#121331,primary:#646e78,secondary:#545454,tertiary:#ebe6ef"
                                stroke="100"
                                state="hover-empty"
                                style={lordIconStyle}
                                onClick={() => handleDelete(index)}>
                            </lord-icon>
                        </div>
                    ))}

                </div>

                <button className='new-btn'>
                    <h2 onClick={openModal}>+ NEW TASK</h2>
                </button>

                {isModalOpen && (
                    <div className="modal">
                        <div className="modal-background">
                            <form onSubmit={handleSubmit}>
                                <h1>Task title</h1>
                                <input required className='task-input' type="text" maxLength='30' placeholder='Task title...' value={taskTitle} onChange={handleInputChange} />
                                <button className='task-button' type="submit">Submit</button>
                            </form>
                            <button className='task-button' onClick={closeModal}>Close</button>
                        </div>

                    </div>
                )}



                <h3 className='logout-btn' onClick={logoutHandler}>Log Out</h3>
            </div>

        </div>
    );
};

export default PrivateScreen;
