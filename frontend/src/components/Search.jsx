import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Search = () => {
  const { search, showSearch, setSearch, setShowSearch } =
    useContext(StoreContext);
  return showSearch ? (
    <div className="absolute md:w-60 w-36 flex right-10 md:right-0">
      <Link to="/collection">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search"
          className="border border-gray-400 rounded-full px-2 py-1 outline-none w-28 md:w-48"
        />
      </Link>

      <div className="w-4 md:w-10">

      <img
        onClick={() =>{ setShowSearch(false), setSearch()}}
        src={assets.cross_icon}
        className="inline w-4 cursor-pointer ml-2"
        alt=""
        />
        </div>
    </div>
  ) : null;
};

export default Search;
