import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';


function VisitorInventoryDetails() {
    const { itemId } = useParams();
    const [visitorDetails, setVisitorDetails] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/inventory/item/${itemId}`)
            .then((res) => res.json())
            .then((data) => setVisitorDetails(data.item))
            .catch((error) => console.error('Error fetching details, error'));
    }, [itemId]);

    if (!visitorDetails) {
        return <p>Loading item details...</p>;
    }

    return (
        <>
            <div>
                <h1>Item Details</h1>
                <p><strong>Item ID:</strong> {visitorDetails.id}</p>
                <p><strong>Item Name:</strong> {visitorDetails.item_name}</p>
                <p><strong>Quantity:</strong> {visitorDetails.quantity}</p>
                <p><strong>Description:</strong> {visitorDetails.description}</p>
            </div>
            <h3>
                <Link to="/visitor">Back to Inventory</Link>
            </h3>
        </>
    )
}

export default VisitorInventoryDetails;