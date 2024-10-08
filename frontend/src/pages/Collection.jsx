import React, { useState, useContext, useEffect } from "react";
import Item from "../components/Item.jsx";
import axios from "axios";
import { StoreContext } from "../context/StoreContext.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Footer from "../components/Footer";
import Title from "../components/Title.jsx";
import { useLocation } from "react-router-dom";

const Collection = () => {
  const { url, search } = useContext(StoreContext);
  const [fetchItems, setFetchItems] = useState([]);
  const [filters, setFilters] = useState({ category: [], minPrice: '', maxPrice: '' });
  const [filteredItems, setFilteredItems] = useState([]); // Store filtered products

  const location = useLocation(); // Get location object
  const initialCategory = location.state?.category; // Read the category from state if available

  // These categories will be sent to Sidebar as props
  const categories = ["Men", "Women", "Kids", "Footwear"]; // Update categories here 

  // Fetch products once on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}api/product/all`);
        if (response.data.success) {
          const allProducts = response.data.products;
          setFetchItems(allProducts);
          setFilteredItems(allProducts);

          if (initialCategory) {
            setFilters((prevFilters) => ({ ...prevFilters, category: [initialCategory] }));
          }
        }
      } catch (error) {
        console.error("Error fetching Products:", error);
      }
    };
    fetchData(); // Call the function to fetch data
  }, [url, initialCategory]); // Dependency array includes `url` and `initialCategory`

  // Handle filter change
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Apply filters to products
  useEffect(() => {
    let filtered = fetchItems;

    // Apply category filter
    if (filters.category.length > 0) {
      filtered = filtered.filter((product) => filters.category.includes(product.category));
    }

    // Apply price range filter
    if (filters.minPrice) {
      filtered = filtered.filter((product) => product.price >= parseFloat(filters.minPrice));
    }

    if (filters.maxPrice) {
      filtered = filtered.filter((product) => product.price <= parseFloat(filters.maxPrice));
    }

    // Apply search filter
    if (search) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredItems(filtered); // Update the filtered products

  }, [filters, fetchItems, search]); // Re-run effect when filters, fetchItems, or search change

  return (
    <div className="pt-8">
      <div className="text-gray-400 text-xl">
        <Title text1={"COLLECTION"} text2={""} />
      </div>
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 bg-[#f1f3f6]">
        {/* Sidebar */}
        <div className="sidebar">
          <Sidebar onFilterChange={handleFilterChange} sendCategories={categories} />
        </div>

        <div className="py-2 sm:py-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mx-2">
          {filteredItems.map((item) => (
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
      <Footer />
    </div>
  );
};

export default Collection;
