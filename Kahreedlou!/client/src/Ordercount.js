import React, { useEffect, useState } from "react";

const OrderCount = () => {
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    // Fetch the total number of orders
    fetch("/api/get-orders")
      .then((response) => response.json())
      .then((data) => {
        const totalorders=data.length;
        console.log(totalorders);
        setTotalOrders(totalorders);
    
      })
      .catch((error) => {
        console.error("Error fetching total orders:", error);
      });
  }, []);

  return (
    <div className="order-count">
      Orders ({totalOrders})
    </div>
  );
};

export default OrderCount;
