import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/authContext/AuthContext';
import AppContext from '../context/AppContext/AppContext';

import Spinner from '../components/Spinner';

function Login(props) {
  const { auth, logUser, loading } = useContext(AuthContext);
  const { clearState } = useContext(AppContext);

  useEffect(() => {
    clearState();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (auth) props.history.push('/');
  }, [auth, props.history]);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const handleSubmit = async e => {
    e.preventDefault();
    if (formData.username.length < 1 || formData.password.length < 6) return;
    logUser(formData);
    window.M.toast({ html: 'Logging in' });
  };
  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  // if (auth) return <Redirect to='/' />;
  if (loading) return <Spinner />;
  return (
    <div className='wrap valign-wrapper'>
      <div className='row login'>
        <form
          type='submit'
          className='col s12 l4 offset-l4 card-panel'
          action=''
          onSubmit={handleSubmit}
        >
          <h5 className='center-align'>Login</h5>
          <div className='input-field'>
            <i className='material-icons prefix'>account_circle</i>
            <input
              onChange={handleChange}
              id='username'
              type='text'
              name='username'
              className='validate'
              value={formData.username}
            />
            <label htmlFor='username'>Username</label>
          </div>
          <div className='input-field'>
            <i className='material-icons prefix'>lock</i>
            <input
              onChange={handleChange}
              id='password'
              name='password'
              type='password'
              className='validate'
              value={formData.password}
            />
            <label htmlFor='password'>Password</label>
          </div>
          <div className='but center-align'>
            <button className='waves-effect waves-light btn blue'>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
