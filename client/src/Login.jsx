import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login({ setUserId }) {
    const [formValues, setFormValues] = useState({
        username: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            let response = await fetch("http://localhost:8080/existingUser", {
                method: "POST",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formValues),
            });

            const result = await response.json();
            // used for debug
            console.log(result);

            if (response.ok && result.message === "Login successful.") {
                setUserId(result.userId)
                navigate("/inventory");
            } else {
                alert(result.message); 
            }
        } catch (error) {
            console.error(error);
            alert("Login failed. Please try again."); 
        }
    };

    const handleFormInputs = (event) => {
        const { name, value } = event.target;
        setFormValues((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div>
            <h1>Log In</h1>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    name="username"
                    value={formValues.username}
                    onChange={handleFormInputs}
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={formValues.password}
                    onChange={handleFormInputs}
                />
            </div>
            <button onClick={handleLogin}>Log In</button>
            <h3>
                <Link to="/">Create Account</Link>
            </h3>
            <h3>
                <Link to="/visitor">View inventory as a visitor</Link>
            </h3>
        </div>
    );
}

export default Login;
