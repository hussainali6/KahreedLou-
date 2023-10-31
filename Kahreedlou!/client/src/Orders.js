import React, { useEffect, useState } from "react";
import emailjs from "emailjs-com";
import axios from "axios";


const Orders = () => {
    const [emailSent, setEmailSent] = useState(false);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch orders from the API endpoint
        fetch("/api/get-orders")
            .then((response) => response.json())
            .then((data) => {
                setOrders(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching orders:", error);
                setLoading(false);
            });
    }, []);

    const handleDeleteOrder = async (orderId) => {
        try {
            // Send a DELETE request to the server to delete the order by ID
            await axios.delete(`/api/delete-order/${orderId}`);

            // Update the local state to remove the deleted order
            setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
        } catch (error) {
            console.error(error);
        }
    };

    const sendEmail = async (toEmail) => {
        emailjs.init("cz9E25FDSiHitH_Gl"); 

        const templateParams = {
            to_email: toEmail,
            total_amount: 1500,
        };

        try {
            await emailjs.send(
                "service_qqutquh", 
                "template_7dj32fj",
                templateParams
            );
            setEmailSent(true);
            alert('Confirmation mail sent successfully!');
        } catch (error) {
            console.error("Error sending email:", error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <div style={{ marginLeft: '-300px' }}>
                <div className="col-md-9" id="page-content-wrapper">
                    <h2>Orders</h2>
                    {orders.length === 0 ? (
                        <p>No orders available.</p>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-bordered table-hover float-right" style={{background:'gray',color:'white'}}>
                                <thead >
                                    <tr>
                                        <th>Date</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>City</th>
                                        <th>State</th>
                                        <th>Address</th>
                                        <th>Amount</th>
                                        <th>Order Details</th>
                                        <th>Paid By</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order._id}>
                                            <td>{order.currentDate}</td>
                                            <td>{order.name}</td>
                                            <td>{order.email}</td>
                                            <td>{order.city}</td>
                                            <td>{order.state}</td>
                                            <td>{order.shippingAddress}</td>
                                            <td>${order.totalOrderAmount}</td>
                                            <td>{order.productDetails}</td>
                                            <td>{order.selectedPaymentOption}</td>
                                            <td>
                                                <button className="btn btn-light" onClick={() => handleDeleteOrder(order._id)}>
                                                    Remove
                                                </button>
                                                <br />
                                                <br />
                                                <button className="btn btn-light" onClick={() => sendEmail(order.email)}>
                                                    Confirm
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Orders;
