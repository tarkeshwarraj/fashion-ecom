import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Shoe from "./pages/Shoe";
import About from "./pages/About";
import Contact from "./pages/Contact";
import LoginPopup from "./components/LoginPopup.jsx";
import Cart from "./pages/Cart.jsx";
import Product from "./pages/Product.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verify from "./pages/Verify.jsx";
import MyOrder from "./pages/MyOrder.jsx";
import Profile from "./pages/Profile.jsx";
import Search from "./components/Search.jsx";
import MobileMenu from "./components/MobileMenu.jsx";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <div className="">
      {/* Header component with setShowLogin handler */}
      <Header setShowLogin={setShowLogin} />

      {/* Main content area with padding for different screen sizes */}
      <div className="sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-[#f1f3f6]">
        {/* Conditionally render LoginPopup if showLogin is true */}
        {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/shoes" element={<Shoe />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/orders" element={<MyOrder />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      {/* Mobile menu only for smaller screens */}
      <MobileMenu />
    </div>
  );
};

export default App;
