import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {


  return (
    <div className='navbar'>
        <div className="navContainer">
          <Link to="/" style={{color:"white",textDecoration:"none"}}>
            <div className="logo">Iamabooking</div>
          </Link>
        </div>
    </div>
  )
}

export default Navbar