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
  const { workers, deleteWorker } = useContext(AppContext);

  useEffect(() => {
    // if (auth) getUser();
    // getWorkers();
    // eslint-disable-next-line
  }, []);
  const handleDelete = id => {
    deleteWorker(id);
  };

  if (admin)
    return (
      <div>
        <NavBar />
        <Search />
        <div className='row'>
          {/* <Collection admin={true} /> */}
          <Collection admin={true} data={workers} onDelete={handleDelete} />

          <Add worker={true} />
        </div>
      </div>
    );
  return <Redirect to='/' />;
};
export default Workers;
