import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';
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