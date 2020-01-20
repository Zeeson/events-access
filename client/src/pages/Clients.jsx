import React, { useContext } from 'react';
import Search from '../components/Search';
import Collection from '../components/Collection';
import NavBar from '../components/NavBar';
import AppContext from '../context/AppContext/AppContext';
import Spinner from '../components/Spinner';

const Clients = () => {
  const { clients, filtered, filter, loading } = useContext(AppContext);
  return (
    <div>
      <Search />
      <div className='row'>
        {!loading ? (
          <Collection data={!filter ? clients : filtered} />
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};
export default Clients;
