import React from 'react';

const Search = () => {
  return (
    <div className='row'>
      <div className='input-field col s6 offset-s3'>
        <input id='search' type='text' className='validate' />
        <label className='active' htmlFor='search'>
          Search
        </label>
      </div>
    </div>
  );
};
export default Search;
