import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function Inventory({ userId }) {
    const [inventoryData, setInventoryData] = useState([]);

    const [inventoryValues, setInventoryValues] = useState({
        item_name: "",
        description: "",
        quantity: 0,
    });

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8080/inventory/${userId}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Error fetching inventory");
                }
                return res.json();
            })
            .then((data) => {
                setInventoryData(data.inventory || []);
            })
            .catch((error) => {
                console.error("Error fetching inventory:", error);
                setInventoryData([]);
            });
    }, [userId]);

    const handleInventoryInputs = (event) => {
        const { name, value } = event.target;
        setInventoryValues((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAddInventory = () => {
        if (!inventoryValues.item_name || !inventoryValues.description || !inventoryValues.quantity) {
            alert("Please fill all fields!");
            return;
        }
        fetch(`http://localhost:8080/inventory/${userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(inventoryValues),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Inventory added:", data);
                setInventoryData((prevData) => [...prevData, data.newItem]);
                setInventoryValues({ item_name: "", description: "", quantity: 0 });
            })
            .catch((error) => console.error("Error adding inventory:", error));
    };

    const handleEditItem = (item) => {
        setInventoryValues({
            item_name: item.item_name,
            description: item.description,
            quantity: item.quantity,
            itemId: item.id,
        });
    };

    const handleDeleteItem = (itemId) => {
        if (!itemId) {
            //debugging issues - user ID is missing
            console.error("Item ID is missing.");
            return;
        }

        if (!userId) {
            console.error("User ID is missing.");
            return;
        }

        fetch(`http://localhost:8080/inventory/${userId}/${itemId}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (response.ok) {
                    console.log("Item deleted successfully!");

                    setInventoryData((prevData) =>
                        prevData.filter((item) => item.id !== itemId)
                    );
                } else {
                    console.error("Error deleting inventory:", response);
                }
            })
            .catch((error) => {
                console.error("Error deleting inventory:", error);
            });
    };

    return (
        <>
            <div>
                <h1>Welcome to User {userId}'s Inventory</h1>
            </div>
            <div>
                {inventoryData && inventoryData.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>Item Name</th>
                                <th>Item Quantity</th>
                                <th>Item Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inventoryData.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.user_id}</td>
                                    <td>{item.item_name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.description}</td>
                                    <td>
                                        <button onClick={() => handleEditItem(item)}>Edit</button>
                                        <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No inventory data available.</p>
                )}
            </div>
            <div>
                <label htmlFor="item_name">Item Name</label>
                <input
                    type="text"
                    name="item_name"
                    id="item_name"
                    placeholder="Add Item Name"
                    value={inventoryValues.item_name}
                    onChange={handleInventoryInputs}
                />
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <input
                    type="text"
                    name="description"
                    id="description"
                    placeholder="Add Description"
                    value={inventoryValues.description}
                    onChange={handleInventoryInputs}
                />
            </div>
            <div>
                <label htmlFor="quantity">Quantity</label>
                <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    placeholder="Add Quantity"
                    value={inventoryValues.quantity}
                    onChange={handleInventoryInputs}
                />
            </div>
            <div>
                <button type="button" onClick={handleAddInventory}>
                    Add Inventory
                </button>
            </div>
            <div>
                <button type="button" onClick={() => navigate('/')}>
                    Home
                </button>
            </div>
        </>
    );
}

export default Inventory;
