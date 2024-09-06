import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from "../context/StoreContext.jsx";
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Banner = () => {
  const {url} = useContext(StoreContext);
  const [banners, setBanners] = useState([]);
  const [filteredBanners, setFilteredBanners] = useState([]);

  useEffect(()=>{
    const fetchBanners = async () => {

      try{
        const response = await axios.get(`${url}api/banner/all`);
        if(response.data.success) {
          const allBanners = response.data.banners;

          //Filter banners that have a category
          const filtered = allBanners.filter((banner) => {return banner.category === 'banner' }); //{} bracess na ho tho return likhna ki jarurat nhi hai
          setFilteredBanners(filtered);
        }else{
          console.error('Error fetching banners:', response.data.message);
        }
      }catch(err){
        console.error('Error fetching banners:', err);
      };

    } 
    fetchBanners();
  }, [url]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slideToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    // <div className='flex flex-col sm:flex-row border border-gray-400 relative banner-container '>
    //     <div className="left-side absolute md:text-slate-200 bg-slate-100 sm:bg-transparent md:bottom-1/4 bottom-11 md:left-3/4 left-5 text-3xl lg:text-5xl leading-relaxed ">STay StYLIsH</div>
    //     <div className="right-side w-full h-full"><img className='object-cover w-full h-full' src="https://images.unsplash.com/photo-1507101105822-7472b28e22ac?q=80&w=1746&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" /></div>
    // </div>

    <div className="relative pt-8">
      <Slider {...settings}>
        {filteredBanners.map((banner) =>(
          <div key={banner._id} >
            <div className="w-full h-48 sm:h-full p-1">
              <img src={`${url}banners/${banner.image}`} alt={`banner-${banner._id}`} className="object-fit w-full h-full" />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;