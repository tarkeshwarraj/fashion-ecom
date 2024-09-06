import React, { useState } from 'react';
import './Additem.css';
import axios from 'axios';

const Additem = ({ url }) => {
  const [category, setCategory] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);
  const availableSizes = ['Small', 'Medium', 'Large', 'Extra Large', 'Free Size']; // List available
  const footwearSizes = ['38', '40', '42', '44', '46'];
  const [sizes, setSizes] = useState([]); // State to hold selected sizes
  const [isAllSelected, setAllSelected] = useState(false);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);

    const categorySubcategories = {
      Men: ['Shirts', 'Trousers', 'Accessories'],
      Women: ['Dress', 'Bags', 'Jewelry'],
      Kids: ['Toys', 'Clothing', 'School Supplies'],
      Footwear: ['Sports Shoes', 'Casual Shoes', 'Formal Shoes'],
    };

    setSubcategories(categorySubcategories[selectedCategory] || []);
    setSelectedSubcategory(''); // Reset selected subcategory
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...selectedFiles]);
  };

  const handleSizeChange = (e) => {
    const { value, checked } = e.target;

    if (value === 'All') {
      if (checked) {
        setSizes(category === 'Footwear' ? footwearSizes : availableSizes);
        setAllSelected(true);
      } else {
        setSizes([]);
        setAllSelected(false);
      }
    } else {
      if (checked) {
        setSizes((prevSizes) => [...prevSizes, value]);
      } else {
        setSizes((prevSizes) => prevSizes.filter((size) => size !== value));
        setAllSelected(false); // Unmark "All" if any size is unchecked
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', productName);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('subcategory', selectedSubcategory);
    formData.append('sizes', JSON.stringify(sizes)); // Include selected sizes

    images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      const response = await axios.post(`${url}api/product/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(response.data.message);

      // Reset all fields after successful upload
    setProductName('');
    setDescription('');
    setPrice('');
    setCategory('');
    setSubcategories([]);
    setSelectedSubcategory('');
    setImages([]);
    setSizes([]);
    setAllSelected(false);
      
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product');
    }
  };

  return (
    <div className="px-9 py-5 add">
      <form className="flex-col" onSubmit={handleSubmit}>
        <div className="upload-img flex-col">
          <p>Upload Image</p>
          <label htmlFor="images">
            {images.length > 0 ? (
              images.map((img, index) => (
                <img key={index} src={URL.createObjectURL(img)} alt={`image-${index}`} />
              ))
            ) : (
              <img src="/src/assets/upload_area.png" alt="upload area" />
            )}
          </label>
          <input type="file" id="images" name="images" multiple hidden onChange={handleFileChange} />
        </div>
        <div className="product_name flex-col">
          <p>Product Name</p>
          <input type="text" name="name" placeholder="Type here" value={productName} onChange={(e) => setProductName(e.target.value)} />
        </div>
        <div className="description flex-col">
          <p>Description</p>
          <textarea name="description" rows="6" placeholder="Write the content here" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>
        <div className="category flex-col">
          <p>Product Category</p>
          <select name="category" onChange={handleCategoryChange}>
            <option value="">Select Category</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
            <option value="Footwear">Footwear</option>
          </select>
        </div>

        {category && (
          <div className="subCategory flex-col">
            <p>SubCategory</p>
            <select name="subcategory" value={selectedSubcategory} onChange={(e) => setSelectedSubcategory(e.target.value)}>
              <option value="">Select Subcategory</option>
              {subcategories.map((subcat, index) => (
                <option key={index} value={subcat}>
                  {subcat}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Multiple size Selection */}
        <div className="size flex-row">
          <p>Size</p>

          <label htmlFor="size" className="inline-flex items-center mr-3">
            <input type="checkbox" value="All" checked={isAllSelected} onChange={handleSizeChange} />
            All
          </label>
          {category === 'Footwear'
            ? footwearSizes.map((size) => (
                <label key={size} className="inline-flex items-center mr-3">
                  <input
                    type="checkbox"
                    value={size}
                    checked={sizes.includes(size)}
                    onChange={handleSizeChange}
                    className="mr-1"
                  />
                  {size}
                </label>
              ))
            : availableSizes.map((size) => (
                <label key={size} className="inline-flex items-center mr-3">
                  <input
                    type="checkbox"
                    value={size}
                    checked={sizes.includes(size)}
                    onChange={handleSizeChange}
                    className="mr-1"
                  />
                  {size}
                </label>
              ))}
        </div>

        <div className="price flex-col">
          <p>Price</p>
          <input type="number" name="price" placeholder="$10" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>

        <div className="button flex-col">
          <button type="submit" className="add-btn">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default Additem;
