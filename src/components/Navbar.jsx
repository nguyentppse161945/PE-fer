import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
   <nav>
      <div className="flex justify-between items-center bg-blue-700 p-8 text-white font-medium">
      <div>Staff Management</div>
      <div className="list-none flex gap-4 ">
        <li className="cursor-pointer hover:bg-blue-800">
          <Link to='/'>Home</Link>
        </li>
        <li className="cursor-pointer hover:bg-blue-800">
          <Link to='/dashboard'>Dashboard</Link>
        </li>
        <li className="cursor-pointer hover:bg-blue-800">
          <Link to='/contact'>Contact</Link>
        </li>

      </div>
    </div>
   </nav>
  )
}

export default Navbar