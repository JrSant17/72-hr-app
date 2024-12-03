import { useState } from "react";
import { Link } from "react-router-dom";


function CreateAccount() {
    const [createAccount, setCreateAccount] = useState()


    return (
        <>
            <h1>
                Inventory Home Page
            </h1>
            <div>
                <h2>Create Account</h2>

            </div>
            <div>
                <label htmlFor="firstname">First Name</label>
                <input
                    type="text"
                    name="firstname"
                    id="firstname"
                ></input>
            </div>
            <div>
                <label htmlFor="lastname">Last Name</label>
                <input
                    type="text"
                    name="lastname"
                    id="lastname"
                ></input>
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
            <div>
                <button type="button" >
                    Create Account
                </button>
            </div>
            <h3>
                Already have an account?
                <Link to="/login">Log In</Link>
            </h3>
            <h3>
                <Link to="/visitor">View inventory as a visitor</Link>
            </h3>
        </>
    )
}





export default CreateAccount;