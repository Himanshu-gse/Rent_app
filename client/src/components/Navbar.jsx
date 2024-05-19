import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:3000/api/users/logout'); // Send request to logout endpoint
      setIsLoggedIn(false); // Set authentication status to false on successful logout
      toast.success('User Logged out successfully');
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
      // Optionally handle error
    }
  };
  return (
    <>
      <nav className=' px-10 py-5 flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>RENTIFY</h1>
        <div className='flex gap-4'>
          {!isLoggedIn && (
            <NavLink
              className='bg-white text-black rounded-md font-semibold px-5 py-1 active:bg-black active:text-white'
              to={'/signup'}
            >
              Sign Up
            </NavLink>
          )}
          {!isLoggedIn ? (
            <NavLink className='bg-black text-white font-semibold rounded-md px-5 py-1' to={'/login'}>
              Log in
            </NavLink>
          ) : (
            <button
              className='bg-black text-white font-semibold rounded-md px-5 py-1'
              to={'/login'}
              onClick={handleLogout}
            >
              Log out
            </button>
          )}
        </div>
      </nav>
      <Outlet context={[isLoggedIn, setIsLoggedIn]} />
    </>
  );
};
export default Navbar;
