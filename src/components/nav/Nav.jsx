import React from 'react';
import './nav.css';

import NavSearch from './NavSearch';
import NavMessage from './NavMessage';
import NavAvatar from './NavAvatar';

function Nav() {
  return (
    <nav className="header-nav ms-auto">
      <ul className="d-flex align-items-center">
        <NavSearch />
        <NavMessage />
        <NavAvatar />
      </ul>
    </nav>
  );
}

export default Nav;
