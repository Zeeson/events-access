import React, { useContext, useEffect } from 'react';
import Search from '../components/Search';
import Collection from '../components/Collection';
import NavBar from '../components/NavBar';
import AppContext from '../context/AppContext/AppContext';
import AuthContext from '../context/authContext/AuthContext';

const Clients = () => {
  const { clients, getClients, loading } = useContext(AppContext);
  const { getUser, auth, token } = useContext(AuthContext);

  useEffect(() => {
    console.log('mount client');
    auth && getClients();
  }, [auth]);

  return (
    <div>
      <NavBar />
      <Search />
      <div className='row'>
        <Collection data={clients} />
      </div>
    </div>
  );
};
export default Clients;
