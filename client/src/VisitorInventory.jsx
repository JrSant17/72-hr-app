import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


function VisitorInventory() {
    const [visitorItems, setVisitorItems] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/inventory/')
            .then((res) => res.json())
            .then((data) => setVisitorItems(data))
            .catch((error) => console.error('Error fetching visitor items:', error))

    }, []);

    return (
        <>
            <div>
                <h1>Visitor Inventory</h1>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Item ID</th>
                        <th>User ID</th>
                        <th>Item Name</th>
                        <th>Item Quantity</th>
                        <th>Item Description</th>
                    </tr>
                </thead>
                <tbody>
                {visitorItems.map((item, index) =>
                    <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.user_id}</td>
                        <td>{item.item_name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.description}</td>
                    </tr>
                )}
                </tbody>
            </table>

            <h3>
                <Link to="/">Create Account</Link>
            </h3>
            <h3>
                <Link to="/login">Login</Link>
            </h3>
        </>
    )
}





export default VisitorInventory;