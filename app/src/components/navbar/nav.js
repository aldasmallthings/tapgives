import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './nav.css';

function Navbar(props) {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <nav className='navbar'>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          tapgives
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>           
            <li onClick={closeMobileMenu} className='social-icons' >
              <i className="fab fa-facebook-square"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-tiktok"></i>
            </li>     
          <li className='nav-item'>
            <Link
              to='/about'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              about
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/contacts'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              contacts
            </Link>
          </li>
          <li>
            <Link
              to='/login'
              className='nav-links-mobile'
              onClick={closeMobileMenu}
            >
              login
            </Link>
          </li>
        </ul>
        <div>
          <props.component /> 
        </div>
      </nav>
    </>
  );
}

export default Navbar;
