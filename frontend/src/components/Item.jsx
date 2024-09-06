import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext.jsx';

const Item = ({ id, name, image, price }) => {
  const { url } = useContext(StoreContext);

  return (
    <Link to={`/product/${id}`} aria-label={`View details of ${name}`}>
      <div className="bg-white border rounded-md shadow-md overflow-hidden w-full sm:w-52 hover:scale-105 transition-transform duration-200 m-2">
        <img src={`${url}uploads/${image}`} alt={name} className="w-full h-full object-cover" />
        <div className="p-4 text-center">
          <h3 className="text-lg font-semibold text-gray-800 truncate">{name}</h3>
          <p className="text-sm text-gray-600 mt-1">${price?.toFixed(2) || '0.00'}</p>
        </div>
      </div>
    </Link>
  );
};

export default Item;
