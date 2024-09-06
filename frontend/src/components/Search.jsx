import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { assets } from "../assets/assets";

const Search = () => {
  const { search, showSearch, setSearch, setShowSearch } =
    useContext(StoreContext);
  return showSearch ? (
    <div className="absolute w-64 h-auto -right-0 -top-0">
        
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search"
        className="border border-gray-400 rounded-full px-2 py-1 outline-none"
      />


      <img
           onClick={() => setShowSearch(false)}
           src={assets.cross_icon}
           className="inline w-3 cursor-pointer ml-2"
           alt=""
         />
    </div>
  ) : null;
  //   return showSearch ? (
  //     <div className='absolute -left-44'>
  //     <div className=" border-t border-b  text-center">
  //       <div className="inline-flex item-center justify-center border border-grey-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
  //         <input
  //           value={search}
  //           onChange={(e) => setSearch(e.target.value)}
  //           type="text"
  //           placeholder="Search"
  //           className="flex-1 outline-none bg-inherit text-sm bg-gray-50"
  //         />
  //         <img src={assets.search_icon} className="w-4" alt="" />
  //       </div>
  //       <img
  //         onClick={() => setShowSearch(false)}
  //         src={assets.cross_icon}
  //         className="inline w-3 cursor-pointer"
  //         alt=""
  //       />
  //     </div>
  //   </div>
  //   ): null
};

export default Search;
