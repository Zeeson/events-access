import React, { useContext, useEffect } from 'react';
import Search from '../components/Search';
import Collection from '../components/Collection';
import Add from '../components/Add';
import NavBar from '../components/NavBar';
import AuthContext from '../context/authContext/AuthContext';
import AppContext from '../context/AppContext/AppContext';

import { Redirect } from 'react-router-dom';

const Workers = () => {
  const { admin, auth } = useContext(AuthContext);
  const { workers, deleteWorker, getWorkers, filtered, filter } = useContext(
    AppContext
  );
  useEffect(() => {
    console.log('mount workers');
    auth && admin && getWorkers();
    // eslint-disable-next-line
  }, [auth]);

  const handleDelete = id => {
    deleteWorker(id);
  };

  if (admin)
    return (
      <div>
        <NavBar />
        <Search />
        <div className='row'>
          <Collection
            admin={true}
            data={!filter ? workers : filtered}
            onDelete={handleDelete}
          />
          <Add worker={true} />
        </div>
      </div>
    );
  return <Redirect to='/' />;
};
export default Workers;
