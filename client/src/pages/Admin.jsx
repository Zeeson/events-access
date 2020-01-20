import React, { useContext, useEffect } from 'react';
import Search from '../components/Search';
import Collection from '../components/Collection';
import Add from '../components/Add';
import NavBar from '../components/NavBar';
import AuthContext from '../context/authContext/AuthContext';
import AppContext from '../context/AppContext/AppContext';

import { Redirect } from 'react-router-dom';

const Admin = () => {
  const { admin, auth } = useContext(AuthContext);
  const {
    clients,
    deleteClient,
    deleteClients,
    getClients,
    filtered,
    filter
  } = useContext(AppContext);

  useEffect(() => {
    console.log('mount admin');
    auth && getClients();
    // eslint-disable-next-line
  }, [auth]);
  const handleDelete = id => {
    deleteClient(id);
  };
  const handleModal = e => {
    if (e.target.innerText === 'YES') {
      deleteClients();
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
            data={!filter ? clients : filtered}
            onDelete={handleDelete}
          />
          <Add worker={false} />
        </div>
      </div>
    );
  return <Redirect to='/' />;
};
export default Admin;
