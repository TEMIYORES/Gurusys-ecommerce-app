import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import { OrderType } from "../utilities/Types";

const DashboardOrders: React.FC = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api
      .get("/orders")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  return (
    <div className="flex-grow">
      <div className="w-full bg-lightOrange rounded-md">
        <div className="w-full p-2">
          <div className="w-full grid grid-cols-4 gap-2 items-center text-xs font-bold text-headercolor">
            <div>
              <p>S/N</p>
            </div>
            <p>Reference</p>
            <p>TotalAmount</p>
            <p>Status</p>
          </div>
        </div>
      </div>
      {orders.length < 1 ? (
        <div className="text-left text-sm font-semibold">No orders found.</div>
      ) : null}
      {orders.length
        ? orders.map((order: OrderType, index: number) => {
            return (
              <div key={order.reference} className="w-full rounded-md">
                <div className="w-full p-2">
                  <div className="w-full grid grid-cols-4 gap-2 items-center text-xs font-bold text-headercolor">
                    <div className="flex gap-2 text-sm font-normal">
                      <p>{index + 1}.</p>
                    </div>
                    <p>{order.reference}</p>
                    <p className="">{order.totalAmount}</p>
                    <p
                      className={`w-fit p-2 rounded-lg ${
                        order.status === "Paid" ? "bg-green-300" : "bg-red-300"
                      }`}
                    >
                      {order.status}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default DashboardOrders;
