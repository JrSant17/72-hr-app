import { useState } from "react";
import { Link } from "react-router-dom";


function Visitor() {
    const [createAccount, setCreateAccount] = useState()


    return (
        <>
            <div>
                <h1>Visitor</h1>
            </div>
            <h3>
                <Link to="/">Create Account</Link>
            </h3>
            <h3>
                <Link to="/login">Login</Link>
            </h3>
        </>
    )
}





export default Visitor;