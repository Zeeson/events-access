import React, { useContext, useEffect } from 'react';
import Search from '../components/Search';
import Collection from '../components/Collection';
import NavBar from '../components/NavBar';
import AuthContext from '../context/authContext/authContext';
import AppContext from '../context/AppContext/AppContext';

const Clients = () => {
  const { getUser, auth } = useContext(AuthContext);
  const { getClients, clients, workers } = useContext(AppContext);

  useEffect(() => {
    // getClients();
    // if (auth) getUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <NavBar />
      <Search />
      <div className='row'>
        <Collection data={workers} />
      </div>
    </div>
  );
};
export default Clients;
