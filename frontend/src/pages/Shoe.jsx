import React, { useState, useContext, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import axios from 'axios';
import { StoreContext } from '../context/StoreContext';
import Item from '../components/Item';
import Title from "../components/Title.jsx";

const Shoe = () => {
  const {url} = useContext(StoreContext);
  const [fetchItems, setFetchItems] = useState([]);
  const [filters, setFilters] = useState({ category: [], minPrice: '', maxPrice: ''});
  const [filteredItems, setFilteredItems] = useState([]);

  //This categories will sent to sidebar as a props
  const categories = ["Sports Shoes", "Casual Shoes", "Formal Shoes", ]


  useEffect( () =>{ 
  const fetch = async() => {
    try{
      const response = await axios.get(`${url}api/product/all`);
      if(response.data.success){
        const allProduct = response.data.products;
        const filteredProduct = allProduct.filter(shoes => shoes.category === "Footwear");
        setFetchItems(filteredProduct);
      }

    }catch (error){
      console.error("Unable to fetch:", error)
    }
  };

  fetch();
}, [url]);

//Handle filter change
const handleFilterChange = (newFilter) =>{
  setFilters(newFilter);
  
}

useEffect(() => {

  let filtered = fetchItems;

  //Apply subCategory filter
  if(filters.category.length > 0){
    filtered = filtered.filter((product) => filters.category.includes(product.subcategory));
  }

  if(filters.minPrice){
    filtered = filtered.filter((product)=> product.price >= parseFloat(filters.minPrice));
  }

  if(filters.maxPrice){
    filtered = filtered.filter((product) => product.price <= parseFloat(filters.maxPrice));
  }
  
  setFilteredItems(filtered);

}, [filters, fetchItems]);

  return (
    <div className="pt-8">

<div className="text-gray-400 text-xl">
        <Title text1={"SHOES"} text2={""} />
      </div>
    
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 bg-[#f1f3f6]">
      
      {/*sidebar*/}
      <div className="sidebar">
        <Sidebar onFilterChange={handleFilterChange} sendCategories={categories} />
      </div>

      {/* Items */}
      <div className="py-2 sm:py-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mx-2">
        {
          filteredItems.map((item, index) => (
            <Item
            key={item._id}
            id={item._id}
            name={item.name}
            image={item.images}
            price={item.price}
            />

          ))
          
        }
      </div>
    </div>
          </div>
  )
}

export default Shoe