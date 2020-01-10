import React, { useContext } from 'react';
import AppContext from '../context/AppContext/AppContext';

const Search = () => {
  const { filterState, isSearch } = useContext(AppContext);
  const handleChange = e => {
    filterState(e.target.value);
    isSearch(e.target.value);
  };

  return (
    <div className='row'>
      <form action=''>
        <div className='input-field col s6 offset-s3'>
          <input
            onChange={handleChange}
            id='search'
            type='text'
            className='validate'
          />
          <label htmlFor='search'>Search</label>
        </div>
      </form>
    </div>
  );
};
export default Search;
