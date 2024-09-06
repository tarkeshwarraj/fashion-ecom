import React from 'react';
import axios from 'axios';
import { useEffect, useContext } from 'react';
import { StoreContext } from '../context/StoreContext.jsx';
import { useState } from 'react';
import SliderItem from './SliderItem.jsx';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { assets } from '../assets/assets.js';

const Circle = () => {
  const {url} = useContext(StoreContext);
  const [filteredSlider, setFilteredSlider] = useState([]);

  useEffect(()=>{

    const fetchImages = async() =>{
      try{
        const response = await axios.get(`${url}api/banner/all`);
        if(response.data.success) {
          const allBanners = response.data.banners;

          //Filter banner that have a category
          const filtered = allBanners.filter((banner) => banner.main ==='slider');
          setFilteredSlider(filtered);
        }else{
          console.error('Error fetching banners:', response.data.message);
        }
      }catch(err){
        console.error('Error fetching banners:', err);
      }
  }
  fetchImages();
  },[url]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 6,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    rtl: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  };


  return (
    <div>
        <div className="py-8">

          <div className="deal-banner w-full md:hidden pb-3">
            <img src={assets.deal} alt="" />
          </div>


          <Slider {...settings}>

         {
           filteredSlider.map((item, index)=>
            <SliderItem 
           key= {index}
           id={item._id}
           image = {item.image}
           category = {item.category}
           />
           
          )
        }
        </Slider>
        </div>
    </div>
  )
}

export default Circle