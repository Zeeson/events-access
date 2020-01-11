import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className='error'>
      <h3>Oops, you have landed on the wrong page </h3>

      <div>
        <Link to='/'>
          <button className='waves-effect waves-light btn blue'>Go Home</button>
        </Link>
      </div>
    </div>
  );
};

export default Error;
