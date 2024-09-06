import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import Search from "./Search";

const Header = ({ setShowLogin }) => {
  const { token, setToken, cartItems,search, showSearch, setSearch,setShowSearch,totalSum } = useContext(StoreContext);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <>
      <div className="flex justify-between items-center py-5 font-medium px-3 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-[#ffff] ">
        <Link to="/">
          <div className="text-3xl">
            <p className="tracking-tighter text-base md:text-3xl ">TaruDev POINT</p>
            {/* <p className="rounded-full aspect-square bg-orange-500 "></p> */}
          </div>
        </Link>
        <div className="">
          <ul className=" sm:flex flex-row gap-5 text-sm hidden">
            {/* Navlink Converts in a tag to the browser */}
            <NavLink to="/" className="flex flex-col items-center gap-1">
              <p>HOME</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
            <NavLink
              to="/collection"
              className="flex flex-col items-center gap-1"
            >
              <p>COLLECTION</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
            <NavLink to="/shoes">
              <li>SHOES</li>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
            <NavLink to="/about">
              <li>ABOUT US</li>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
            <NavLink to="/contact">
              <li>CONTACT US</li>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden " />
            </NavLink>
          </ul>
        </div>
        <div className="flex flex-row gap-6 ">
          <div className="search relative hidden md:block">
         {showSearch ? <Search /> : 
          <img
          onClick={()=>setShowSearch(true)}
          className="w-5 min-w-5 cursor-pointer"
          src={assets.search_icon}
          alt=""
          />}
          </div>

          <div className="group relative">
            <div className="search">
              <img
                src={assets.profile_icon}
                className="w-5 min-w-5"
                alt=""
                // onClick={() => setShowLogin(true)}
              />
            </div>

            {!token ? (
              <div className="absolute hidden group-hover:block dropdown-menu right-0 pt-4">
                <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded relative z-10">
                  <p
                    onClick={() => setShowLogin(true)}
                    className="cursor-pointer hover:text-black"
                  >
                    Login
                  </p>
                </div>
              </div>
            ) : (
              <div className="absolute hidden group-hover:block dropdown-menu bg-[#ffff] rounded-lg right-0 pt-4">
                <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-[#ffff] text-gray-500 rounded  relative z-10">
                  <Link to="/profile" className="relative bg-[#ffff]">
                    {" "}
                    <p className="cursor-pointer hover:text-black">
                      My Profile
                    </p>
                  </Link>
                  <Link to="/orders" className="relative">
                    {" "}
                    <p className="cursor-pointer hover:text-black">Orders</p>
                  </Link>
                  <p
                    onClick={logout}
                    className="cursor-pointer hover:text-black"
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>

          <Link to="/cart" className="relative hidden md:block">
            <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[10px]">
              {totalSum}
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
