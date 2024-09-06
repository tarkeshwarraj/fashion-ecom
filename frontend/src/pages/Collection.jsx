import React, { useState, useContext, useEffect } from "react";
import Item from "../components/Item.jsx";
import axios from "axios";
import { StoreContext } from "../context/StoreContext.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Footer from "../components/Footer";

const Collection = () => {
  const { url } = useContext(StoreContext);
  const [fetchItems, setFetchItems] = useState([]);
  const [filters, setFilters] = useState({ category: [], minPrice: '', maxPrice: '' });
  const [filteredItems, setFilteredItems] = useState([]); //Store filtered products

  //This categories will sent to sidebar as a props
  const categories = ["Men", "Women", "Kids", "Footwear"]; //Update categories here 

  // Fetch products once on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}api/product/all`);
        if (response.data.success) {
          const allProducts = response.data.products;
          setFetchItems(allProducts);
          setFilteredItems(allProducts);
        }
      } catch (error) {
        console.error("Error fetching Products:", error);
      }
    };
    fetchData();
  }, [url]); // Dependency array includes `url` to re-fetch if it changes

  // Handle filter change
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  //Apply filters to products
  useEffect(() => {
    let filtered = fetchItems;

    //Apply category filter
    if(filters.category.length > 0){
      filtered = filtered.filter((product) => filters.category.includes(product.category));
    }

    // Apply price range filter
    if (filters.minPrice) {
      filtered = filtered.filter((product) => product.price >= parseFloat(filters.minPrice));
    }

    if (filters.maxPrice) {
      filtered = filtered.filter((product) => product.price <= parseFloat(filters.maxPrice));
    }

    setFilteredItems(filtered); //Update the filtered products

  }, [filters, fetchItems]); //Re-run effect when filters or allProducts change


  return (
    <div className="pt-10">

    <hr className="h-[1.5px] bg-gray-500"/>
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-6  bg-[#f1f3f6]">
      {/* SideBar */}
      <div className="sidebar py-8">
        <Sidebar onFilterChange={handleFilterChange} sendCategories={categories}  />
      </div>


      <div className="py-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mx-2">
        {filteredItems.map((item, index) => (
          <Item
            key={item._id}
            id={item._id}
            name={item.name}
            image={item.images[0]}
            price={item.price}

            />
          ))}
      </div>
      
    </div>
    <Footer/>
 </div>
  );
};

export default Collection;
