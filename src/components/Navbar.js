import React from 'react';
import {NavLink} from 'react-router-dom';

function Navbar() {
  return (
    <nav className='navbar'>
        <div className="nav-center">
            <NavLink to='/home'>
                <h3>The Cocktail Hub</h3>
            </NavLink>
            <ul className='nav-links'>
                <li>
                    <NavLink to='/home'>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/about'>
                        About
                    </NavLink>
                </li>
            </ul>
        </div>
    </nav>
  );
}
export default Navbar;
