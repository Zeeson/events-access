import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const NavBar = props => {
  const handleClick = e => {
    localStorage.removeItem('auth');
    props.history.push('/');
  };
  return (
    <div>
      <nav>
        <div className='nav-wrapper'>
          <span className='brand-logo'>Logo</span>
          <ul id='nav-mobile' className='right hide-on-med-and-down'>
            <li>
              <Link onClick={handleClick} to='/'>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default withRouter(NavBar);
