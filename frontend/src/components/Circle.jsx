import React from "react";
import axios from "axios";
import { useEffect, useContext } from "react";
import { StoreContext } from "../context/StoreContext.jsx";
import { useState } from "react";
import SliderItem from "./SliderItem.jsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { assets } from "../assets/assets.js";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Circle = () => {
  const { url } = useContext(StoreContext);
  const [filteredSlider, setFilteredSlider] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`${url}api/banner/all`);
        if (response.data.success) {
          const allBanners = response.data.banners;

          //Filter banner that have a category
          const filtered = allBanners.filter(
            (banner) => banner.main === "slider"
          );
          setFilteredSlider(filtered);
        } else {
          console.error("Error fetching banners:", response.data.message);
        }
      } catch (err) {
        console.error("Error fetching banners:", err);
      }
    };
    fetchImages();
  }, [url]);

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
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  const handleItemClick = (category) => {
    // Navigate to the collection page with the category as state
    navigate(`/collection`, { state: { category } });
  };

  return (
    <div>
      <div className="py-6 sm:py-8">
        <div className="deal-banner w-full md:hidden pb-3 mb-3">
          <img src={assets.deal} alt="" />
        </div>

        <Slider {...settings}>
          {filteredSlider.map((item, index) => (
            <div
              key={index}
              className="cursor-pointer" // Add cursor pointer for better UX
              onClick={() => handleItemClick(item.category)} // Handle item click
            >
              <SliderItem
                key={index}
                id={item._id}
                image={item.image}
                category={item.category}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Circle;
