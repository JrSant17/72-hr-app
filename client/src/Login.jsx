import { useState } from "react";
import { Link } from "react-router-dom";


function Login() {
    const [createLogin, setCreateLogin] = useState(false)


    return (
        <>
            <div>
                <h1>Log In</h1>
            </div>
            <div >
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    id="username"
                ></input>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    type="text"
                    name="password"
                    id="password"
                ></input>
            </div>
            <h3>
                <Link to="/">Create Account</Link>
            </h3>
            <h3>
                <Link to="/visitor">View inventory as a visitor</Link>
            </h3>
        </>
    )
}





export default Login;