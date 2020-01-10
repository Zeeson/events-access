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
  const { clients, deleteClient, getClients, filtered, filter } = useContext(
    AppContext
  );

  useEffect(() => {
    console.log('mount admin');
    auth && getClients();
    // eslint-disable-next-line
  }, [auth]);
  const handleDelete = id => {
    deleteClient(id);
  };

  if (admin)
    return (
      <div>
        <NavBar />
        <Search />
        <div className='row'>
          <Collection
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
