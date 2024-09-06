import React from 'react'

const Header = () => {
  return (
    <div className='flex flex-row justify-between lg:pt-10 border-b-4'>
        <div className="icon border border-red-100">Admin Panel</div>
        <div className="logout">
            <h3>Logout</h3>
        </div>
    </div>
  )
}

export default Header