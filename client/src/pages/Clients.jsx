import React, { useContext } from 'react';
import Search from '../components/Search';
import Collection from '../components/Collection';
import AppContext from '../context/AppContext/AppContext';
import AuthContext from '../context/AuthContext/AuthContext';
import Spinner from '../components/Spinner';

const Clients = () => {
  const { clients, filtered, filter, loading } = useContext(AppContext);
  const { admin } = useContext(AuthContext);
  return (
    <div>
      <Search />
      <div className='row'>
        {!loading ? (
          <Collection data={!filter ? clients : filtered} admin={admin} />
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};
export default Clients;
