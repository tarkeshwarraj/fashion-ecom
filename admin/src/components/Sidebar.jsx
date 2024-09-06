import React from 'react'
import './Sidebar.css';
import { Link } from 'react-router-dom';


const Sidebar = () => {
  return (
    <div className='sidebar'>
        <ul className=''>
            <Link to="/orders"><li>Orders</li></Link>
            <Link to='/add-item'><li>Add Items</li></Link>
            <Link to="/list"><li>List</li></Link>
            <Link to="/banner"><li>Add Banner</li></Link>
            <Link to="/theme"><li>Add Theme</li></Link>
           
        </ul>
    </div>
  )
}

export default Sidebar