import React, { useContext, useEffect, useState } from "react";
import "./Cart.css"; // Assuming additional styles if needed
import { RiDeleteBin5Line } from "react-icons/ri";
import CartTotal from "../components/CartTotal";
import { StoreContext } from "../context/StoreContext.jsx";
import axios from "axios";
import Title from "../components/Title.jsx";

const Cart = () => {
  const { url, token, loadCartData, cartItems, fetchItems } =
    useContext(StoreContext); // Get fetchItems from context

  const [address, setAddress] = useState({
    name: "",
    number: "",
    pincode: "",
    locality: "",
    streetAddress: "",
    city: "",
    state: "",
  });

  // Fetch address from API on component mount
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        if (!token || !url) {
          console.error("Token or URL is not defined");
          return;
        }
        // Await the API response
        let response = await axios.get(`${url}api/user/get-address`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        let data = response.data.data;
        setAddress(data); // Set the fetched address data to state
        loadCartData(token);
      } catch (error) {
        console.error("Failed to fetch address", error);
      }
    };
    fetchAddress();
  }, [url, token]);

  // Handle input change
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));

    // Send update to backend
    try {
      await axios.put(
        `${url}api/user/update`,
        { [name]: value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Address updated successfully");
    } catch (error) {
      console.error("Failed to update address", error);
    }
  };

  //calculate Subtotal and Total
  const calculateTotals = () => {
    let subtotal = cartItems.reduce((acc, item) => {
      const product = fetchItems.find((prod) => prod._id === item.itemId);
      const itemTotal = (product ? product.price : 0) * item.quantity;
      return acc + itemTotal;
    }, 0);

    const shippingFee = 5.99; //Example fixed shipping fee
    const total = subtotal + shippingFee;

    return { subtotal, total, shippingFee};
  }

  const { subtotal, total, shippingFee } = calculateTotals();


  // Filter product details based on cartItems
  const cartProductDetails = cartItems.map((cartItem) => {
    const product = fetchItems.find((item) => item._id === cartItem.itemId);
    return {
      ...product,
      ...cartItem,
    };
  });

  //Totally Remove Item
  const removeItem = async (itemId, size) => {
    try {
      let response = await axios.delete(`${url}api/cart/remove`, {
        data: { itemId, size }, //delete method kiya and data propert bana kar bheja tho ho gaya. not connected ka prob
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        loadCartData(token);
      } else {
        console.error("Failed to remove item:", response.data.message);
      }
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  //Update item Quantity
  const updateItemQuantity = async (itemId, size, quantity) => {
    try {
      const response = await axios.put(
        `${url}api/cart/update`,
        { itemId, size, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if(response.data.success){
        loadCartData(token);
      }else {
        console.log('Failed to update quantity:', response.data.message);
      }
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderData = {
      items: cartProductDetails,
      amount: total,
      address: address,
    }

    let response = await axios.post(url + "api/order/place", orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("Error");
    }

  };

  return (
    <div className="border-t pt-8 ">
      <div className="text-2xl mb-3 md:px-24">
        <Title text1={"Your"} text2={"Cart"} />
      </div>
    
    <form onSubmit={placeOrder}>
      <div className="cart grid md:grid-cols-6 md:px-24 py-2 gap-6">
        
        {/* Cart Items Section */}
        <div className="cart-items md:col-span-4 space-y-8">
          {/* Address Form */}
          <div className="address bg-white p-6 shadow-md rounded-md">
            <h2 className="text-xl font-semibold mb-4">Address</h2>
            <div className="grid gap-4">
              <input
                type="text"
                name="name"
                value={address.name}
                onChange={handleChange}
                placeholder="Name"
                required
                className="border p-2 rounded-md"
              />
              <input
                type="text"
                name="number"
                value={address.phone}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                required
                className="border p-2 rounded-md"
              />
              <input
                type="text"
                name="pincode"
                value={address.pincode}
                onChange={handleChange}
                placeholder="Pincode"
                required
                className="border p-2 rounded-md"
              />
              <input
                type="text"
                name="locality"
                value={address.locality}
                onChange={handleChange}
                placeholder="Locality"
                className="border p-2 rounded-md"
              />
              <input
                type="text"
                name="streetAddress"
                value={address.streetAddress}
                onChange={handleChange}
                placeholder="Address (Area and Street)"
                required
                className="border p-2 rounded-md md:col-span-2"
              />
              <input
                type="text"
                name="city"
                value={address.city}
                onChange={handleChange}
                placeholder="City/District/Town"
                required
                className="border p-2 rounded-md"
              />
              <input
                type="text"
                name="state"
                value={address.state}
                onChange={handleChange}
                placeholder="State"
                required
                className="border p-2 rounded-md"
              />
            </div>
          </div>

          {/* Cart Items */}
          {cartProductDetails.map((item, index) => (
            <div
              key={index}
              className="items py-4 border-b-2 border-r text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img
                  src={`${url}uploads/${item.images}`}
                  className="w-16 sm:w-20"
                  alt={item.name}
                />
                <div>
                  <p className="text-xs sm:text-lg font-medium">{item.name}</p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>${item.price}</p>
                    <p className="px-2 sm:px-3 py-1 border bg-slate-50">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quantity Management */}
              <div className="flex items-center">
                <button
                  type="button"
                  className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 text-center"
                  onClick={() =>
                    item.quantity > 1
                      ? updateItemQuantity(item.itemId, item.size, item.quantity - 1)
                      : removeItem(item._id, item.size)
                  }
                >
                   <span className="text-red-500 text-lg">-</span>
                </button>
                <p className="border max-w-20 sm:max-w-30 px-1 w-30 sm:px-4 py-1 text-center text-lg">
                { item.quantity }
                </p>
                <button
                  type="button"
                  className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 text-center"
                  onClick={() =>
                    updateItemQuantity(item.itemId, item.size, item.quantity + 1)
                  }
                >
                  <span className="text-green-500 text-lg">+</span>
                </button>
              </div>

              {/* Remove Item */}
              <p
                className="w-4 sm:w-5 cursor-pointer text-red-500"
                onClick={() => {
                  console.log(
                    "Removing item with ID:",
                    item.itemId,
                    "and size:",
                    item.size
                  );
                  removeItem(item.itemId, item.size);
                }}
              >
                <RiDeleteBin5Line />
              </p>
            </div>
          ))}
        </div>

        {/* Cart Total Section */}
        <div className="cart-total md:col-span-2 w-full">
          <div className="flex flex-col justify-between h-full">
            <div className="cart-total mb-4 sm:p-10 p-5">
              <Title text1={"Total"} text2={""}/>
              {/* Add details for total price, etc. here */}
              <p>Subtotal:  ${subtotal.toFixed(2)}</p>
              <p>Shipping Fee: ${shippingFee.toFixed(2)}</p>
              <p>Total: ${total.toFixed(2)}</p>
            </div>
            <div className="border-t-2">
              <div className="text-end px-5">
                <button type="submit" className="bg-black text-white text-sm my-8 px-8 py-3 rounded-md hover:bg-gray-800">
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
    </div>
  );
};

export default Cart;
