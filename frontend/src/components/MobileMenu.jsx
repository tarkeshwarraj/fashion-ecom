import React,{useContext} from "react";
import { IoCartOutline } from "react-icons/io5";
import { FcPortraitMode } from "react-icons/fc";
import { FcReuse } from "react-icons/fc";
import { FcMenu } from "react-icons/fc";
import { FcHome } from "react-icons/fc";
import { NavLink } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

const MobileMenu = () => {
    const {totalSum} = useContext(StoreContext);
  return (
    <div className="sticky bottom-0 bg-white shadow-lg md:hidden w-full">
      <div>
        <ul className="flex justify-evenly py-2">
          {/* <li className='text-4xl'><FcReuse /></li> */}
          <NavLink to="/" className="flex flex-col items-center gap-1">
            <li className="text-4xl">
              <FcHome />
              <hr className="w-full border-none h-[1.5px] bg-gray-700 hidden" />
            </li>
          </NavLink>
          <NavLink to="/collection" className="flex flex-col items-center gap-1">
            <li className="text-4xl">
              <FcMenu />
              <hr className="w-full border-none h-[1.5px] bg-gray-700 hidden" />
            </li>
          </NavLink>
          <NavLink to="/orders" className="flex flex-col items-center gap-1">
            <li className="text-4xl">
              <FcPortraitMode />
              <hr className="w-full border-none h-[1.5px] bg-gray-700 hidden" />
            </li>
          </NavLink>
          <NavLink to="/cart" className="flex flex-col items-center gap-1 relative">
            <li className="text-4xl">
              <IoCartOutline />
              <p className="absolute right-[-5px] top-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[10px]">
              {totalSum}
            </p>
              <hr className="w-full border-none h-[1.5px] bg-gray-700 hidden" />
            </li>
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default MobileMenu;
