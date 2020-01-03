import React from 'react';
import Search from '../components/Search';
import Collection from '../components/Collection';
import NavBar from '../components/NavBar';

const Clients = () => {
  return (
    <div>
      <NavBar />
      <Search />

      <div className='row'>
        <Collection />
      </div>
    </div>
  );
};
export default Clients;
