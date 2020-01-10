import React, { useContext } from 'react';
import Search from '../components/Search';
import Collection from '../components/Collection';
import NavBar from '../components/NavBar';
import AppContext from '../context/AppContext/AppContext';

const Clients = () => {
  const { clients, filtered, filter } = useContext(AppContext);

  return (
    <div>
      <NavBar />
      <Search />
      <div className='row'>
        <Collection data={!filter ? clients : filtered} />
      </div>
    </div>
  );
};
export default Clients;
