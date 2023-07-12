import React from 'react'
import "./Header.css"
import {FaHome} from "react-icons/fa"
import { Link, useNavigate } from 'react-router-dom';
import {auth} from '../../Config/firebaseConfig';
import {useAuthState} from 'react-firebase-hooks/auth';
import {signOut} from 'firebase/auth'

function Header() {
    const [user] = useAuthState(auth);
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
            {
              user?
              <>
              <div className='username'><span>{user.displayName? user?.displayName : user?.email}</span></div>
              <button className='auth-link' onClick={()=>signOut(auth)}>logout</button>
              </>
              :
              <Link className='auth-link' to='/Auth'>Sign Up</Link>
            }
    </div>
  )
}

export default Header