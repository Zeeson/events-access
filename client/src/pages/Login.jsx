import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/authContext/authContext';
import Spinner from '../components/Spinner';

function Login(props) {
  const { auth, logUser } = useContext(AuthContext);
  useEffect(() => {
    if (auth) props.history.push('/');
    // eslint-disable-next-line
  }, [auth]);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const handleSubmit = async e => {
    e.preventDefault();
    if (formData.username.length < 1 || formData.password.length < 6) return;
    await logUser(formData);
  };
  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  // if (auth) return <Redirect to='/' />;
  if (auth === null) return <Spinner />;
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
            <label className='active' htmlFor='username'>
              Username
            </label>
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
            <label className='active' htmlFor='password'>
              Password
            </label>
          </div>
          <div className='but center-align'>
            <button className='waves-effect waves-light btn'>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
