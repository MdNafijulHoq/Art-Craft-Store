import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProviders/AuthProviders';

const Navbar = () => {

    const navigate = useNavigate();

    const {users, logOut} = useContext(AuthContext)
    const [isHovered, setIsHovered] = useState(false);
    
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')

    const handleThemeChange = e => {
      
      if(e.target.checked){
        setTheme('aqua')
      } 
      else{
        setTheme('light')
      }
    }

    useEffect( () => {
      localStorage.setItem('theme', theme)
      const grabTheme = localStorage.getItem('theme')
      document.querySelector('html').setAttribute('data-theme', grabTheme)
    },[theme])

    const handleLogOut = () => {

        logOut()
        .then(() => {

        })
        .catch(() => {

        })
        navigate('/login')
    }

    return (

        <div className="navbar bg-base-100 fixed top-0 w-full z-50 shadow-lg">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li><NavLink to='/'>HomePage</NavLink></li>
      <li>
      <NavLink to='/allartcraftitems'>All Art & Craft Items</NavLink>
      </li>
      {
        users && <>
        <li><NavLink to='/addcraftitem'>Add Craft Item</NavLink></li>
        <li><NavLink to='/myartcraftlist'>My Art&Craft List</NavLink></li>
        </>
      }
      </ul>
    </div>
    <a className="btn btn-ghost text-sm sm:text-sm md:text-base lg:text-xl 2xl:text-xl"><span className='text-red-500'>Art</span>&<span className='text-yellow-400'>Craft</span></a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><NavLink to='/'>HomePage</NavLink></li>
      <li>
      <NavLink to='/allartcraftitems'>All Art & Craft Items</NavLink>
      </li>
      {
        users && <>
        <li><NavLink to='/addcraftitem'>Add Craft Item</NavLink></li>
        <li><NavLink to='/myartcraftlist'>My Art&Craft List</NavLink></li>
        </>
      }
    </ul>
  </div>
  <div className="navbar-end gap-6">
                           
    {
        users ? (
          
            <div className='flex justify-center items-center gap-2'>

<div>
              <label className="flex cursor-pointer gap-2 md:gap-4 p-2 items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-5 h-5 md:w-6 md:h-6"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round">
                                  <circle cx="12" cy="12" r="5" />
                                  <path
                                    d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                                </svg>
                                <input onChange={handleThemeChange} checked={theme === 'aqua'} type="checkbox" className="toggle theme-controller w-10 h-6 md:w-12 md:h-7" />
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-5 h-5 md:w-6 md:h-6"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round">
                                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                                </svg>
                                </label>
              </div>

              {/* main paort */}
              <div
                className="relative"
                onMouseEnter={() => setIsHovered(true)}   
                onMouseLeave={() => setIsHovered(false)}  
            >
                {/* User's photoURL */}
                
                <div className="avatar mr-5">
               
                    <div className="w-12 rounded-3xl">
                   
                    <img 
                        src={users && users.photoURL ? users.photoURL : 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'} 
                        alt="User Avatar"/>
                    </div>
                </div>

                {/* Display name and Log Out button when hovered */}
                {isHovered && (
                    <div className="absolute right-0 mr-4 z-10 w-48 bg-white border rounded-lg shadow-lg p-3">
                        
                        <p className="text-sm font-medium">{users.displayName}</p>
                        <button
                            onClick={handleLogOut}
                            className="btn btn-sm btn-error mt-2 w-full"
                        >
                            Log Out
                        </button>
                    </div>
                )}
            </div>
            </div>
        )
        
        : <>
            <NavLink className={({isActive}) => isActive ? 'btn btn-active btn-accent' : 'btn btn-active'} to='/login'><button className="btn-active">Sign In</button></NavLink>
            <NavLink className={({isActive}) => isActive ? 'btn btn-active btn-accent' : 'btn btn-active'} to='/registration'><button className="btn-active">Sign Up</button></NavLink>
        </>
    }
  </div>
</div>
    );
};

export default Navbar;

