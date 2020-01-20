import React, { useContext, useEffect, useRef } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AuthContext from '../context/AuthContext/AuthContext';

const NavBar = props => {
  const elem = useRef();
  const { logout, admin } = useContext(AuthContext);
  useEffect(() => {
    window.M.Sidenav.init(elem.current, {
      edge: 'left',
      inDuration: 250
    });
  }, [props]);
  const handleClick = () => {
    logout();
  };

  return props.location.pathname === '/login' ? null : (
    <div>
      <nav>
        <div className='nav-wrapper blue'>
          <span className='brand-logo'>Events Access</span>
          <a href='/' data-target='slide-out' className='sidenav-trigger'>
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
      <ul ref={elem} className='sidenav blue' id='slide-out'>
        {admin && props.location.pathname === '/admin' && (
          <li>
            <Link className='sidenav-close' to='/workers'>
              Workers
            </Link>
          </li>
        )}
        {admin && props.location.pathname === '/workers' && (
          <li>
            <Link className='sidenav-close' to='/admin'>
              Clients
            </Link>
          </li>
        )}
        {admin && props.location.pathname !== '/' && (
          <li>
            <Link className='sidenav-close' to='/'>
              Home
            </Link>
          </li>
        )}
        {admin && props.location.pathname === '/' && (
          <>
            <li>
              <Link className='sidenav-close' to='/'>
                Home
              </Link>
            </li>
            <li>
              <Link className='sidenav-close' to='/admin'>
                Clients
              </Link>
            </li>
            <li>
              <Link className='sidenav-close' to='/workers'>
                Workers
              </Link>
            </li>
          </>
        )}
        <li>
          <Link className='sidenav-close' onClick={handleClick} to='/'>
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default withRouter(NavBar);
