import React, { useContext, useEffect } from 'react';
import Search from '../components/Search';
import Collection from '../components/Collection';
import Add from '../components/Add';
import NavBar from '../components/NavBar';
import AuthContext from '../context/authContext/authContext';
import AppContext from '../context/AppContext/AppContext';

import { Redirect } from 'react-router-dom';

const Admin = () => {
  const { getUser, auth, admin } = useContext(AuthContext);
  const { clients, deleteClient } = useContext(AppContext);

  useEffect(() => {
    // if (auth) getUser();
    // eslint-disable-next-line
  }, []);
  const handleDelete = id => {
    deleteClient(id);
  };

  if (admin)
    return (
      <div>
        <NavBar />
        <Search />
        <div className='row'>
          <Collection admin={true} data={clients} onDelete={handleDelete} />
          <Add worker={false} />
        </div>
      </div>
    );
  return <Redirect to='/' />;
};
export default Admin;
