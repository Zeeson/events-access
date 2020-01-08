import React, { useContext, useEffect } from 'react';
import Search from '../components/Search';
import Collection from '../components/Collection';
import Add from '../components/Add';
import NavBar from '../components/NavBar';
import AuthContext from '../context/authContext/authContext';
import { Redirect } from 'react-router-dom';

const Admin = () => {
  const { getUser, auth, admin } = useContext(AuthContext);
  useEffect(() => {
    if (auth) getUser();
    // eslint-disable-next-line
  }, []);

  if (admin)
    return (
      <div>
        <NavBar />
        <Search />
        <div className='row'>
          <Collection admin={true} />
          <Add worker={false} />
        </div>
      </div>
    );
  return <Redirect to='/' />;
};
export default Admin;
