import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { useParams } from "react-router-dom";

const Product = () => {
  const { productId } = useParams(); // Get product ID from the URL
  const { fetchItems, url, currency,addToCart } = useContext(StoreContext); // Get fetchItems from context
  const [productData, setProductData] = useState(null); // State to store product data
  const [isLoading, setIsLoading] = useState(true); // State to manage loading
  const [image, setImage] = useState("");

  const [size, setSize] = useState("");

  const findProductData = () => {
    if (fetchItems.length > 0) {
      // Only search if fetchItems is not empty
      const foundProduct = fetchItems.find((item) => item._id === productId);
      setProductData(foundProduct || null); // Set the found product or null
      setImage(foundProduct.images[0]);
      setIsLoading(false); // Set loading to false once the search is complete
    }
  };

  useEffect(() => {
    if (fetchItems.length > 0) {
      // Trigger search only when fetchItems is populated
      findProductData();
    }
  }, [productId, fetchItems]); //jaisa hi fetchItems mai kuch data aayaga tho 2nd time fir sa render hoga

  // Log product data whenever it changes
  useEffect(() => {
    if (productData !== null) {
      // console.log(productData);
    }
  }, [productData]);

  if (isLoading) {
    return <p>Loading product details...</p>; // Display loading message while fetching data
  }

  if (!productData) {
    return <p>Product not found.</p>; // Display message if no product is found
  }

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {/* Add code to render product images here */}
            {productData.images.map((item, index) => (
              <img
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                onClick={() => setImage(item)}
                src={`${url}uploads/${item}`}
                key={index}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img
              className="w-full h-auto"
              src={`${url}uploads/${image}`}
              alt=""
            />

            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => addToCart(productData._id, size)} className="px-[8px] py-[18px] my-4 rounded-sm bg-[#ff9f00] text-base font-medium text-white">ADD TO CART</button>
              <button className="px-[8px] py-[18px] my-4 rounded-sm bg-[#fb641b] text-base font-medium text-white">BUY NOW</button>
            </div>
          </div>
        </div>
        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-3">{productData.name}</h1>

          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>

          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>

          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border px-1 md:py-2 md:px-4 mx-0.5 bg-gray-100 ${
                    item === size ? "border-orange-500" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <hr className="mt-8 sm:w-4/5" />

          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Orignal Product</p>
            <p>Cash on delivery available on this product.</p>
            <p>Easy return and exechange policy within 7days.</p>
          </div>

          <div className="offers mt-6">
            <h3 className="mb-4">Available offers</h3>
            <p>
              <img
                className="inline-flex"
                src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90"
                alt=""
              />
              <span> Bank Offer</span> Get ₹50 Instant Discount on first
              Flipkart UPI transaction on order of ₹200 and above
            </p>{" "}
            <br />
            <p>
              <img
                className="inline-flex"
                src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90"
                alt=""
              />
              <span> Bank Offer</span> 10% off up to ₹1,000 on BOBCARD
              Transactions, on orders of ₹5,000 and above
            </p>{" "}
            <br />
            <p>
              <img
                className="inline-flex"
                src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90"
                alt=""
              />
              <span> Special Price</span> Get at flat ₹199
            </p>{" "}
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
