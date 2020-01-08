import React, { useContext, useEffect } from 'react';
import Search from '../components/Search';
import Collection from '../components/Collection';
import Add from '../components/Add';
import NavBar from '../components/NavBar';
import AuthContext from '../context/authContext/authContext';
import AppContext from '../context/AppContext/AppContext';

import { Redirect } from 'react-router-dom';

const Workers = () => {
  const { getUser, auth, admin } = useContext(AuthContext);
  const { getWorkers } = useContext(AppContext);

  useEffect(() => {
    if (auth) getUser();
    // getWorkers();
    // eslint-disable-next-line
  }, []);

  if (admin)
    return (
      <div>
        <NavBar />
        <Search />
        <div className='row'>
          <Collection admin={true} />
          <Add worker={true} />
        </div>
      </div>
    );
  return <Redirect to='/' />;
};
export default Workers;
