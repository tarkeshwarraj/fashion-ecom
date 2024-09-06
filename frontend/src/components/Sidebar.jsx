import React, { useState } from "react";
import { FcExpand, FcCollapse } from "react-icons/fc";

const Sidebar = ({ onFilterChange, sendCategories }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [isFilterVisible, setIsFilterVisible] = useState(false); // Default visible on md and above

  // Handle checkbox change
  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setSelectedCategories((prevCategories) => {
      const newCategories = checked
        ? [...prevCategories, value]
        : prevCategories.filter((category) => category !== value);

      onFilterChange({
        category: newCategories,
        minPrice: minPrice,
        maxPrice: maxPrice,
      });
      return newCategories;
    });
  };

  // Handle minimum price change
  const handleMinPriceChange = (e) => {
    const value = e.target.value;
    setMinPrice(value);
    onFilterChange({
      category: selectedCategories,
      minPrice: value,
      maxPrice: maxPrice,
    });
  };

  // Handle maximum price change
  const handleMaxPriceChange = (e) => {
    const value = e.target.value;
    setMaxPrice(value);
    onFilterChange({
      category: selectedCategories,
      minPrice: minPrice,
      maxPrice: value,
    });
  };

  const toggleFilterVisibility = () => {
    setIsFilterVisible((prevVisible) => !prevVisible);
  };

  return (
    <div className="w-full sm:w-64 h-full p-4 border-r border-t bg-[#fff] border-none rounded-md md:mt-8">
      <div className="flex justify-between items-center md:block">
        <h2 className="text-xl font-semibold mb-4">Filter Products</h2>
        <button
          onClick={toggleFilterVisibility}
          className="md:hidden"
        >
          {isFilterVisible ? <FcCollapse /> : <FcExpand />}
        </button>
      </div>

      {/* Smooth slide-down effect for filter content */}
      <div
        className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
          isFilterVisible || window.innerWidth >= 768 ? "max-h-screen" : "max-h-0"
        }`}
      >
        {/* Category Filter using checkboxes */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Category</label>
          <div className="flex flex-col">
            {sendCategories.map((category) => (
              <label key={category} className="inline-flex items-center mb-2">
                <input
                  type="checkbox"
                  name="category"
                  value={category}
                  checked={selectedCategories.includes(category)}
                  onChange={handleCategoryChange}
                  className="mr-2"
                />
                {category}
              </label>
            ))}
          </div>
        </div>

        {/* Price Range Filters */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Min Price</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={minPrice}
            onChange={handleMinPriceChange}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Max Price</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={maxPrice}
            onChange={handleMaxPriceChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
