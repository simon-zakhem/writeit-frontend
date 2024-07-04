import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../Profile/UserContext';
import logo from '../../img/logo.png';
import './header.css';
import homeService from '../../Services/homeService';

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const storedUserInfo = localStorage.getItem('userInfo');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const fetchUserInfo = async () => {
    try {
      if (storedUserInfo) {
        setUserInfo(JSON.parse(storedUserInfo));
      } else {
        const response = await homeService.profile();
        setUserInfo(response);
        localStorage.setItem('userInfo', JSON.stringify(response));
      }
    } catch (error) {
      console.error('Error fetching profile', error);
      if (error.response && error.response.status === 401) {
        // Set user info to null if unauthorized
        setUserInfo(null);
        localStorage.removeItem('userInfo');
      }
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleLogout = async () => {
    try {
      await homeService.logout();
      setUserInfo(null);
      localStorage.removeItem('userInfo');
    } catch (error) {
      console.error(error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // makes sure the username does not get deleted after page refresh
  const username = userInfo?.result?.data?.username || userInfo?.username;
  // const userId = userInfo?.result?.data?.id || userInfo?.id;

  return (
    <header>
      <Link to="/" className="logo">
        <img src={logo} style={{ width: '90px', height: 'auto' }} alt="Logo" />
      </Link>
      {username && (
        <div className="user-welcome">
          <span>{`Hello, ${username}`}</span>
        </div>
      )}
      <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <Link to={'/'} className='auth-link' onClick={closeMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" style={{ transform: 'translateY(3.5px) translateX(-4px)' }} viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          Home
        </Link>
        {username ? (
          <>
            <Link to={`/profile/${username}`} className="auth-link" onClick={closeMenu}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" style={{ transform: 'translateY(3.5px) translateX(-4px)' }} viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
              Profile
            </Link>
            <Link to={'/create'} className="auth-link" onClick={closeMenu}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" style={{ transform: 'translateY(3.5px) translateX(-1px)' }} strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 svg-icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
              Create Post
            </Link>
            <Link to={'/'} className='auth-link' onClick={() => { handleLogout(); closeMenu(); }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" style={{ transform: 'translateY(3.5px) translateX(-4px)' }} viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
              </svg>
              Logout
            </Link>
          </>
        ) : (
          <>
            {/* <Link to="/login" className="auth-link" onClick={closeMenu}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" style={{ transform: 'translateY(3.5px) translateX(-5px)' }} viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
              </svg>
              Login
            </Link> */}
            <Link to="/signup" className="auth-link" onClick={closeMenu}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" style={{ transform: 'translateY(3.5px) translateX(-5px)' }} viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
              </svg>
              Register
            </Link>
          </>
        )}
      </nav>
      <div className="hamburger" onClick={toggleMenu}>
        <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
      </div>
    </header>
  );
};

export default Header;