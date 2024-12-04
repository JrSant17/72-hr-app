import { useEffect, useState } from "react";

function Inventory({userId}) {
    const [inventoryData, setInventoryData] = useState([]);

    const [inventoryValues, setInventoryValues] = useState({
        item_name: "",
        description: "",
        quantity: 0,
    });

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
            console.error("Please fill all fields!");
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
            })
            .catch((error) => console.error("Error adding inventory:", error));

    };

    return (
        <>
            <div>
                <h1>Inventory</h1>
            </div>
            <div>
                {inventoryData && inventoryData.length > 0 ? (
                    <ul>
                        {inventoryData.map((item, index) => (
                            <li key={index}>
                                User ID: {item.user_id} - {item.item_name} - {item.quantity} ({item.description})
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No inventory data available.</p>
                )}
            </div>
            <div>
                        <label htmlFor="first_name">Item Name</label>
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
                        <label htmlFor="first_name">Description</label>
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
                        <label htmlFor="first_name">Quantity</label>
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

        </>
    );
}

export default Inventory;
