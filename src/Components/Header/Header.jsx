import React from 'react'
import "./Header.css"
import {FaHome} from "react-icons/fa"
import { Link, useNavigate } from 'react-router-dom';

function Header() {
    const categories = ["Health", "Food", "Travel", "Technology"];
    const navigate = useNavigate();

  return (
    <div className='header-container'>
        <FaHome onClick={()=>navigate('/')}/>
            <div className="catergories-container">
                {
                    categories.map(item => <Link to={`/Category/${item}`} className="nav-link">{item}</Link>)
                }
            </div>
    </div>
  )
}

export default Header