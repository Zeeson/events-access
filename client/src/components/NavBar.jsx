import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AuthContext from '../context/authContext/AuthContext';

const NavBar = props => {
  const { logout, admin } = useContext(AuthContext);

  const handleClick = () => {
    logout();
  };
  return (
    <div>
      <nav>
        <div className='nav-wrapper blue'>
          <span className='brand-logo'>Logo</span>
          <ul id='nav-mobile' className='right hide-on-med-and-down'>
            {admin && props.location.pathname === '/admin' && (
              <li>
                <Link to='/workers'>Workers</Link>
              </li>
            )}
            {admin && props.location.pathname === '/workers' && (
              <li>
                <Link to='/admin'>Clients</Link>
              </li>
            )}
            {admin && props.location.pathname !== '/' && (
              <li>
                <Link to='/'>Home</Link>
              </li>
            )}
            {admin && props.location.pathname === '/' && (
              <>
                <li>
                  <Link to='/'>Home</Link>
                </li>
                <li>
                  <Link to='/admin'>Clients</Link>
                </li>
                <li>
                  <Link to='/workers'>Workers</Link>
                </li>
              </>
            )}
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
