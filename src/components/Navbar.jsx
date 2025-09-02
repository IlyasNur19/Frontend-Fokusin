import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };


  const menuItems = (
    <>
      {user ? (
        <li><button onClick={handleLogout}>Logout</button></li>
      ) : (
        <>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-lg fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto flex justify-center">
        

        <div className="navbar-start">
          <img src="/logo.png" alt="logo" className='w-36 object-contain' />
        </div>

   
        <div className="navbar-end">
   
          <ul className="menu menu-horizontal px-1 hidden lg:flex">
            {menuItems}
          </ul>

          <div className="dropdown dropdown-end lg:hidden">
            <label tabIndex={0} className="btn btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              {menuItems}
            </ul>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Navbar;