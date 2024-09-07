import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { FcProcess } from "react-icons/fc";
import { FcShipped } from "react-icons/fc";
import { FaHandHoldingHeart } from "react-icons/fa6";
import { FcCancel } from "react-icons/fc";
import LoginPopup from "../components/LoginPopup.jsx";

const MyOrder = () => {
  const { url, token, showLogin, setShowLogin   } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      // Send request to the backend to fetch order details
      let response = await axios.get(`${url}api/order/details`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setOrders(response.data.orderData); // Store the fetched orders in state
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching is complete
    }
  };

  useEffect(() => {
    fetchOrders(); // Fetch orders when the component mounts
  }, [token]);

  return (
    <div className="py-10">
      <div className="orders grid grid-cols-1 md:px-4 lg:px-20 bg-[#f1f3f6]">
        <div className="title text-center mb-8">
          <Title text1={"My"} text2={"Orders"} />
        </div>

        {!token ? (<div className="flex justify-center">
          <div className="group-hover:block dropdown-menu right-0 pt-4">
                <div className="flex flex-col border-none gap-2 w-36 py-2.5 px-3 text-black text-center  rounded relative z-10">
                  <p
                    className=" hover:text-black"
                  >
                    Login Please....
                  </p>
                </div>
              </div>
        </div>):(null)}

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p> // Display loading message while fetching
        ) : (
          orders.map(
            (
              order // Code to render each order
            ) => (
              <React.Fragment key={order._id}>
                {/* Iterate over all items in the order */}
                {order.items.map(
                  (
                    item,
                    itemIndex // Code to render each item
                  ) => (
                    <div
                      key={item._id}
                      className="bg-white shadow-md rounded-lg py-3  hover:shadow-xl transition-shadow duration-300 ease-in-out grid grid-cols-8 md:gap-4 mb-4"
                    >
                      {/* Display each image inside the item's images array */}
                      {item.images && item.images.length > 0 ? (
                        <div className="image col-span-2 flex justify-center items-center rounded-lg overflow-hidden border-none">
                          <img
                            src={`${url}uploads/${item.images[0]}`}
                            alt="First Item"
                            className="w-14 md:w-20 object-cover transition-transform transform hover:scale-105 border-none"
                          />
                        </div>
                      ) : (
                        <div className="image col-span-2">
                          <p>No Image Available</p>
                        </div>
                      )}

                      <div className="details col-span-3 flex flex-col">
                        <p className="text-sm text-[#212121] font-normal py-2">
                          {item.name || "Item Name"}
                        </p>
                      </div>
                      <div className="price col-span-1 flex text-sm text-[#212121] font-normal py-2">
                        ${item.price}
                      </div>
                      <div className="status col-span-2 flex  text-sm text-[#212121] font-normal py-2">
                        {/* conditional rendering of the icon based on order status */}
                        {order.status === "Processing" ? (
                          <FcProcess className="mt-1 mr-2" />
                        ) : order.status === "Shipped" ? (
                          <FcShipped className="mt-1 mr-2" />
                        ) : order.status === "Delivered" ? (
                          <FaHandHoldingHeart className="mt-1 mr-2" />
                        ) : order.status === "Cancelled" ? (
                          <FcCancel className="mt-1 mr-2" />)
                          : null}
                        {order.status}
                      </div>
                    </div>
                  )
                )}
              </React.Fragment>
            )
          )
        )}
      </div>
    </div>
  );
};

export default MyOrder;
