import React from 'react'
import Home from './pages/Home'
import Header from './components/Header'
import { Routes, Route } from 'react-router-dom';
import Additem from './pages/Additem/Additem'
import Order from './pages/Order'
import List from './pages/List';
import Sidebar from './components/Sidebar'
import Banner from './pages/AddBanner/Banner';
import AddTheme from './pages/AddTheme/AddTheme';

const App = () => {
  const url = "http://localhost:5000/";
  return (
    <div className='px-3 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'> 
      <Header />
      <div className="app-content">
      <Sidebar />
      <Routes>
        <Route path='/' element={<Home url={url} />} />
        <Route path='/orders' element={<Order url={url} />} />
        <Route path='/add-item' element={<Additem url={url} />} />
        <Route path='/list' element={<List />} />
        <Route path='/Banner' element={<Banner url={url} />} />
        <Route path='/theme' element={<AddTheme url={url} />} />
      </Routes>
      </div>
    </div>
  )
}

export default App