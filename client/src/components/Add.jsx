import React from 'react';

const Add = () => {
  return (
    <div className='col l5'>
      <form action='' className='card-panel'>
        <h6 className='center-align'>Add Client</h6>
        <div className='input-field'>
          <input id='name' type='text' className='validate' />
          <label className='active' htmlFor='name'>
            Name
          </label>
        </div>
        <div className='input-field'>
          <input id='email' type='text' className='validate' />
          <label className='active' htmlFor='email'>
            Email
          </label>
        </div>
        <div className='but center-align'>
          <button className='waves-effect waves-light btn'>Add</button>
        </div>
      </form>
    </div>
  );
};
export default Add;
