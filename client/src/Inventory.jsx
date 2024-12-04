import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function Inventory() {
    const [inventoryData, setInventoryData] = useState([])

    useEffect(() => {
        fetch('http://localhost:8080/inventory')
            .then(res => res.json())
            .then(data => setInventoryData(data))
    }, []);


    return (
        <>
            <div>
                <h1>Inventory</h1>
            </div>
            <div>
                {inventoryData.length > 0 ? (
                    <ul>
                        {inventoryData.map((item, index) => (
                            <li key={index}>
                                {item.item_name} - {item.quantity}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No inventory data available.</p>
                )}
            </div>
        </>
    )
}





export default Inventory;