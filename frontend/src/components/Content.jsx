import React, { useContext, useEffect, useState } from 'react';
import SliderItem from './SliderItem'
import axios from 'axios';
import { StoreContext } from "../context/StoreContext.jsx";

const Content = () => {
    
    const {url} = useContext(StoreContext);
    const [productItem, setProductItem] = useState([]);

    useEffect(()=>{
    const fetchProductItem = async() => {
        try{
            const response = await axios.get(`${url}api/banner/all`);
            if(response.data.success) {
                const allBanners = response.data.banners;

                //Filter banners that have a category
                const filtered = allBanners.filter((banner) => banner.main === 'content');
                setProductItem(filtered);
            }else{
                console.log('Error fetching banners:', response.data.message);
            }
        }catch(error){
            console.error("Error fetching banners:", error);
        }
    }
    fetchProductItem();
    }
    ,[url]);

    // console.log(productItem);
  return (

    <div className="pt-4">
        <h5 className='px-4 text-gray-400 text-xl tracking-[.25em] '>CATEGORIES TO CART</h5>
   
    <div className="mt-5 flex flex-wrap">
         
            {
                productItem.map((item, index)=>{
                    return (
                    <div key={index} className='w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5'>
                    <SliderItem 
                        key = {index}
                        id = {item._id}
                        image = {item.image}
                        category={ item.category}        
                    />
                    </div>
                    ) 
                })
            }
    </div>
    </div>
   
  )
}

export default Content