import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Search = () => {
  const { search, showSearch, setSearch, setShowSearch } =
    useContext(StoreContext);
  return showSearch ? (
    <div className="absolute w-64 h-auto -right-0 -top-0">
      <Link to="/collection">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search"
          className="border border-gray-400 rounded-full px-2 py-1 outline-none"
        />
      </Link>

      <img
        onClick={() => setShowSearch(false)}
        src={assets.cross_icon}
        className="inline w-3 cursor-pointer ml-2"
        alt=""
      />
    </div>
  ) : null;
};

export default Search;
