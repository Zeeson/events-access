import React from 'react';
import Search from '../components/Search';
import Collection from '../components/Collection';
import Add from '../components/Add';
import NavBar from '../components/NavBar';

const Admin = () => {
  return (
    <div>
      <NavBar />
      <Search />
      <div className='row'>
        <Collection admin={true} />
        <Add />
      </div>
    </div>
  );
};
export default Admin;
