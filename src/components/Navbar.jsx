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

  return (
    <div className="navbar bg-base-100 shadow-lg fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex">
          <img src="/src/assets/logo.png" alt="" className=' w-[200px] object-contain p-3' />
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            {user ? (
              <li><button onClick={handleLogout} className="btn btn-ghost">Logout</button></li>
            ) : (
              <>
                <li><Link to="/login" className="btn btn-ghost">Login</Link></li>
                <li><Link to="/register" className="btn btn-primary ml-2">Register</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;