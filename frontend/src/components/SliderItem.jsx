import React, {useContext} from 'react'
import { StoreContext } from '../context/StoreContext';
import { Link } from 'react-router-dom';


const SliderItem = ({image, id, category}) => {
    const {url} = useContext(StoreContext);
  return (
   <div className="slider-card">
    <div className="max-w-xs overflow-hidden">
      <img src={`${url}banners/${image}`} alt={`banner-${id}`} className='w-full h-full object-cover'/>
    </div>
   </div>
  )
}

export default SliderItem