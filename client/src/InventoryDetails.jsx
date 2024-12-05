import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';


function InventoryDetails() {
    const { itemId } = useParams();
    const [itemDetails, setItemDetails] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/inventory/item/${itemId}`)
            .then((res) => res.json())
            .then((data) => setItemDetails(data.item))
            .catch((error) => console.error('Error fetching details, error'));
    }, [itemId]);

    if (!itemDetails) {
        return <p>Loading item details...</p>;
    }

    return (
        <>
            <div>
                <h1>Item Details</h1>
                <p><strong>Item ID:</strong> {itemDetails.id}</p>
                <p><strong>Item Name:</strong> {itemDetails.item_name}</p>
                <p><strong>Quantity:</strong> {itemDetails.quantity}</p>
                <p><strong>Description:</strong> {itemDetails.description}</p>
            </div>
            <h3>
                <Link to="/inventory">Back to Inventory</Link>
            </h3>
        </>
    )
}

export default InventoryDetails;