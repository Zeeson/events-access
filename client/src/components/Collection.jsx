import React from 'react';

const Collection = props => {
  return (
    <ul className={`collection with-header ` + (props.admin ? 'col l7' : null)}>
      <li className='collection-header'>
        <h4>Clients</h4>
      </li>
      <li className='collection-item avatar'>
        <i className='material-icons circle green'>person</i>
        <div>
          Alvin
          <p>jideadedejifirst@gmail.com</p>
          <p>gibberish-girl</p>
          <a href='#!' className='secondary-content'>
            {props.admin && <i className='material-icons'>close</i>}
          </a>
        </div>
      </li>
    </ul>
  );
};
export default Collection;
