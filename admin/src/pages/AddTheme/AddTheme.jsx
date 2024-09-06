import React, { useState } from "react";
import "./AddTheme.css";
import axios from "axios";

const AddTheme = ({ url }) => {
  const [image, setImage] = useState(null);
  const [main, setMain] = useState("");
  const [category, setCategory] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleTypeChange = (e) => {
    setMain(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image || !main || !category) {
      alert("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("main", main);
    formData.append("category", category);

    try {
      const response = await axios.post(
        `${url}api/slider_banner/slider-add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(response.data.message);
      setImage(null);
      e.target.reset();
    } catch (error) {
      console.error("Error adding banner:", error);
      alert(
        "Error adding banner: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="flex justify-start items-start py-10 px-10">
      <div className="slider border border-gray-300 shadow-lg w-full max-w-md p-6 bg-white rounded-md">
        <h2 className="text-center text-2xl font-semibold mb-6">Slide Content</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="upload-img">
            <p className="font-medium mb-2">Upload Image</p>
            <label htmlFor="image" className="block">
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="banner-preview"
                  className="w-full h-40 object-cover rounded-md mb-2"
                />
              ) : (
                <img
                  src="/src/assets/upload_area.png"
                  alt="upload_area"
                  className="w-full h-40 object-cover rounded-md mb-2 cursor-pointer"
                />
              )}
            </label>
            <input
              type="file"
              id="image"
              name="image"
              hidden
              onChange={handleFileChange}
            />
          </div>

          <div className="type">
            <p className="font-medium mb-2">Type</p>
            <select
              name="main"
              onChange={handleTypeChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Type</option>
              <option value="slider">Slider</option>
              <option value="banner">Banner</option>
              <option value="content">Category Content</option>
            </select>
          </div>

          <div className="category">
            <p className="font-medium mb-2">Product Category</p>
            {main === "banner" ? (
              <select
                name="category"
                onChange={handleCategoryChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Category</option>
                <option value="banner">Banner</option>
              </select>
            ) : (
              <select
                name="category"
                onChange={handleCategoryChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Category</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
                <option value="Footwear">Footwear</option>
              </select>
            )}
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTheme;
