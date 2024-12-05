import { useState } from "react";
import { Link } from "react-router-dom";

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

            {!accountCreated ? (
                <div>
                    <h1>Inventory Landing Page</h1>
                    <h2>Create Account</h2>


                    <div>
                        <label htmlFor="first_name">First Name</label>
                        <input
                            type="text"
                            name="first_name"
                            id="first_name"
                            value={formValues.first_name}
                            onChange={handleFormInputs}
                        />
                    </div>
                    <div>
                        <label htmlFor="last_name">Last Name</label>
                        <input
                            type="text"
                            name="last_name"
                            id="last_name"
                            value={formValues.last_name}
                            onChange={handleFormInputs}
                        />
                    </div>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={formValues.username}
                            onChange={handleFormInputs}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
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
            ) : (
                <div className="account-created-container">
                    <h1>Account created!</h1>
                    <h3>
                        <Link to="/login">Log in</Link>
                    </h3>
                </div>
            )}
        </>
    );
}

export default CreateAccount;