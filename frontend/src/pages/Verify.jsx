import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const [progress, setProgress] = useState(0); // To track progress
  const [loading, setLoading] = useState(true); // To track loading state

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      const response = await axios.post(url + "api/order/verify", {
        success,
        orderId,
      });

      // If the response is successful, wait for progress bar completion
      if (response.data.success) {
        setLoading(false); // Stop loading and display progress bar
        setTimeout(() => {
          navigate("/orders");
        }, 5000); // Redirect after 5 seconds
      } else {
        setLoading(false); // Stop loading and display progress bar
        setTimeout(() => {
          navigate("/orders");
        }, 5000); // Redirect after 5 seconds
        navigate("/");
      }
    } catch (error) {
      console.error("Payment verification failed:", error);
      setLoading(false); // Stop loading and display progress bar
      setTimeout(() => {
        navigate("/orders");
      }, 5000); // Redirect after 5 seconds
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  // Handle progress increment
  useEffect(() => {
    if (!loading) {
      const interval = setInterval(() => {
        setProgress((prevProgress) => (prevProgress >= 100 ? 100 : prevProgress + 1));
      }, 50); // Increment progress every 50ms for a total of 5 seconds

      return () => clearInterval(interval);
    }
  }, [loading]);

  return (
    <div className="verify">
      {loading ? (
        <div className="spinner"></div> // Show spinner while loading
      ) : (
        <div className="w-full bg-gray-300 rounded-full h-2 overflow-hidden">
          <div
            className="bg-blue-500 h-full transition-all duration-[5000ms]"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Verify;
