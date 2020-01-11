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
            // placeholder='Search'
          />
          <label htmlFor='search'>Search</label>
          {/* <span className='clos'>
            <i
              onClick={e => (e.target.parentElement.previousSibling.value = '')}
              className='material-icons clo'
            >
              close
            </i>
          </span> */}
        </div>
      </form>
    </div>
  );
};
export default Search;
