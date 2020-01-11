import React, { useContext, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AuthContext from '../context/authContext/AuthContext';

const NavBar = props => {
  const { logout, admin } = useContext(AuthContext);
  useEffect(() => {
    var elem = document.querySelector('.sidenav');
    window.M.Sidenav.init(elem, {
      edge: 'left',
      inDuration: 250
    });
  }, []);
  const handleClick = () => {
    logout();
  };
  return (
    <div>
      <nav>
        <div className='nav-wrapper blue'>
          <span className='brand-logo'>Events Access</span>
          <a href='/' data-target='mobile-demo' className='sidenav-trigger'>
            <i className='material-icons'>menu</i>
          </a>
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
      <ul className='sidenav' id='mobile-demo'>
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
  );
};

export default withRouter(NavBar);
