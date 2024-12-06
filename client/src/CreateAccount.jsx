import { useState } from "react";
import { Link } from "react-router-dom";
import './CreateAccount.css'

function CreateAccount() {
    const [accountCreated, setAccountCreated] = useState(false);

    const [formValues, setFormValues] = useState({
        first_name: "",
        last_name: "",
        username: "",
        password: "",
    });

    const handleCreateAccount = async () => {
        try {
            let response = await fetch("http://localhost:8080/createUser", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formValues),
            });
            const result = await response.json();
            console.log(result);

            if (response.ok && result.accountCreated) {
                setAccountCreated(true);

            } else {
                setAccountCreated(false);
                alert('Account Creation Failed')

            }
        } catch (error) {
            console.error(error);

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
        <>
        <div className="create-account-page">
            {!accountCreated ? (
                <div className="landing-wrap">
                    <h1>Inventory Landing Page</h1>
                    <div>
                    <h2>Create Account</h2>


                    <div className="input-wrap">
                        <label className="input-header" htmlFor="first_name">First Name</label>
                        <input
                            className="account-input"
                            type="text"
                            name="first_name"
                            id="first_name"
                            value={formValues.first_name}
                            onChange={handleFormInputs}
                        />
                    </div>
                    <div className="input-wrap">
                        <label className="input-header" htmlFor="last_name">Last Name</label>
                        <input
                            className="account-input"
                            type="text"
                            name="last_name"
                            id="last_name"
                            value={formValues.last_name}
                            onChange={handleFormInputs}
                        />
                    </div>
                    <div className="input-wrap">
                        <label className="input-header" htmlFor="username">Username</label>
                        <input
                            className="account-input"
                            type="text"
                            name="username"
                            id="username"
                            value={formValues.username}
                            onChange={handleFormInputs}
                        />
                    </div>
                    <div className="input-wrap">
                        <label className="input-header" htmlFor="password">Password</label>
                        <input
                            className="account-input"
                            type="password"
                            name="password"
                            id="password"
                            value={formValues.password}
                            onChange={handleFormInputs}
                        />
                    </div>
                    <div>
                        <button type="button" onClick={handleCreateAccount}>
                            Create Account
                        </button>
                    </div>
                    <h3>
                        Already have an account? <Link to="/login">Log In</Link>
                    </h3>
                    <h3>
                        <Link to="/visitor">View inventory as a visitor</Link>
                    </h3>
                    </div>
                </div>
            
            ) : (
                <div className="landing-wrap">
                    <h1>Account created!</h1>
                    <h3>
                        <Link to="/login">Log in</Link>
                    </h3>
                </div>
            )}
            </div>
        </>
        
    );
}

export default CreateAccount;