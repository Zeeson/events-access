import React, { useContext, useEffect } from 'react';
import Search from '../components/Search';
import Collection from '../components/Collection';
import Add from '../components/Add';
import AuthContext from '../context/authContext/AuthContext';
import AppContext from '../context/AppContext/AppContext';
import { Redirect } from 'react-router-dom';

const Workers = () => {
  const { admin, auth } = useContext(AuthContext);
  const {
    workers,
    deleteWorker,
    deleteWorkers,
    getWorkers,
    filtered,
    filter
  } = useContext(AppContext);
  useEffect(() => {
    auth && admin && getWorkers();
    // eslint-disable-next-line
  }, [auth]);

  const handleDelete = id => {
    deleteWorker(id);
  };

  const handleModal = e => {
    if (e.target.innerText === 'YES') {
      deleteWorkers();
    } else {
      return;
    }
  };

  if (admin)
    return (
      <div>
        <Search />
        <div className='row flex-s'>
          <Collection
            handleModal={handleModal}
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
