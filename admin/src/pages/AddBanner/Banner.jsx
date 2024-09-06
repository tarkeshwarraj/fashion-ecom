import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Banner.css';

const Banner = ({ url }) => {
    const [image, setImage] = useState(null);
    const [banners, setBanners] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await axios.get(`${url}api/banner/all`);
                if (response.data.success) {
                    const filteredBanners = response.data.banners.filter(banner => banner.main === "banner");
                    setBanners(filteredBanners);
                } else {
                    console.error('Failed to fetch banners');
                }
            } catch (err) {
                setError('Error fetching banners');
                console.error('Error fetching banners:', err);
            }
        };
        fetchBanners();
    }, [url]);

    const handleFileChange = (e) => {
        const selectedFiles = e.target.files[0];
        setImage(selectedFiles);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);

        try {
            const response = await axios.post(`${url}api/banner/add`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert(response.data.message);
            setImage(null);
            e.target.reset();

            // Refresh banners
            const fetchBanners = async () => {
                try {
                    const response = await axios.get(`${url}api/banner/all`);
                    if (response.data.success) {
                        setBanners(response.data.banners);
                    } else {
                        console.error('Failed to fetch banners');
                    }
                } catch (err) {
                    setError('Error fetching banners');
                    console.error('Error fetching banners:', err);
                }
            };

            fetchBanners();
        } catch (err) {
            setError('Error adding banner');
            console.error('Error adding banner:', err);
        }
    };

    const handleRemove = async (id) =>{
        try{
            const response = await axios.delete(`${url}api/banner/delete/${id}`);
            if(response.data.success){
                alert(response.data.message);
                setBanners((prevBanners) => prevBanners.filter((banner) => banner._id !== id));
            }

        }catch(err){
            console.error('Error deleting banner:', err);
            alert('Error deleting banner');
        }

    }

    return (
        <div className="p-6">
            {/* Display error messages */}
            {error && (
                <div className="bg-red-100 text-red-800 px-4 py-2 rounded mb-4 border border-red-300">
                    {error}
                </div>
            )}
    
            {/* Display current banners */}
            <div className="current-banners px-6 py-4 mb-6 border border-blue-300 rounded-lg shadow-sm bg-gray-50">
                <h2 className="text-lg font-semibold mb-4 text-blue-800">Current Banners</h2>
                <div className="banner-images flex flex-row gap-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
                    {banners.length > 0 ? (
                        banners.map((banner) => (
                            <div key={banner._id} className="image-container relative bg-white border rounded shadow transition duration-200 hover:shadow-lg p-3 min-w-[200px]">
                                <img
                                    src={`${url}banners/${banner.image}`}
                                    alt={`banner-${banner._id}`}
                                    className="w-full h-40 object-contain rounded transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-md"
                                />
                                <button
                                    onClick={() => handleRemove(banner._id)}
                                    className="absolute bottom-2 right-2 bg-red-500 text-white text-sm px-2 py-1 rounded shadow hover:bg-red-600 transition duration-200"
                                >
                                    Remove
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">No banners available</p>
                    )}
                </div>
            </div>
    
            {/* Add banner form */}
            <div className="add-banner px-6 py-4 border border-blue-300 rounded-lg shadow-sm bg-gray-50">
                <h2 className="text-lg font-semibold mb-4 text-blue-800">Add Banner</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="w-64 h-40 mb-4 relative border border-dashed border-gray-400 rounded overflow-hidden">
                        <label htmlFor="image" className="cursor-pointer flex items-center justify-center w-full h-full">
                            {image ? (
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt="banner-preview"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <img
                                    src="/src/assets/upload_area.png"
                                    alt="upload_area"
                                    className="opacity-70"
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
    
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition duration-200"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
    
};

export default Banner;
