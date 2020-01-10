import React, { useState, useContext } from 'react';
import AppContext from '../context/AppContext/AppContext';

const Add = props => {
  const [input, setInput] = useState({ name: '', email: '', count: 2 });
  const [check, setCheck] = useState(false);

  const { addClient, addWorker } = useContext(AppContext);

  const handleChange = e => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    const { name, email, count } = input;

    if (!props.worker) {
      if (name.length < 1 || email.length < 1) return;
      if (!check) {
        addClient({
          name,
          email
        });
      } else {
        addClient({
          name,
          email,
          wordcount: count
        });
      }
    } else {
      if (name.length < 1 || email.length < 5) return;
      addWorker({
        username: name,
        password: email
      });
    }
    setInput({
      ...input,
      name: '',
      email: ''
    });
  };
  const handleCheck = e => {
    setCheck(!check);
  };
  return (
    <div className='col l5'>
      <form
        action=''
        type='submit'
        onSubmit={handleSubmit}
        className='card-panel'
      >
        <h6 className='center-align'>
          {props.worker ? 'Add Worker' : 'Add Client'}
        </h6>
        <div className='input-field'>
          <input
            onChange={handleChange}
            name='name'
            id='name'
            type='text'
            className='validate'
          />
          <label className='active' htmlFor='name'>
            {props.worker ? 'Username' : 'Name'}
          </label>
        </div>
        <div className='input-field'>
          <input
            onChange={handleChange}
            name='email'
            id='email'
            type={props.worker ? 'password' : 'text'}
            className='validate'
          />
          <label className='active' htmlFor='email'>
            {props.worker ? 'password' : 'email'}
          </label>
        </div>

        {check && !props.worker && (
          <div className='input-field'>
            <input
              onChange={handleChange}
              name='count'
              id='count'
              type='number'
              className='validate'
              value={input.count}
            />

            <label className='active' htmlFor='count'>
              Token Count (default:2,max:5)
            </label>
          </div>
        )}
        {!props.worker && (
          <p>
            <label>
              <input onChange={handleCheck} type='checkbox' checked={check} />
              <span>Change number of token words (Default:2)</span>
            </label>
          </p>
        )}
        <div className='but center-align '>
          <button className='waves-effect waves-light btn blue'>Add</button>
        </div>
      </form>
    </div>
  );
};
export default Add;
