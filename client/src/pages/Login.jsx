import React, { useState, useContext, useEffect } from 'react';
import AppContext from '../context/AppContext/AppContext';
import AuthContext from '../context/authContext/AuthContext';
import Spinner from '../components/Spinner';
import Toast from '../Util/Toast';

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
    if (formData.username.length < 1 || formData.password.length < 6) {
      if (formData.username.length < 1 || formData.password.length < 1) {
        Toast('Please enter username or password');
        return;
      } else if (formData.password.length < 6) {
        Toast('password length must be greater than 5');
        return;
      }
    } else {
      logUser(formData);
      window.M.toast({ html: 'Logging in' });
    }
  };
  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
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
            <p>
              Test username: <span style={{ color: 'blue' }}>test</span> test
              password: <span style={{ color: 'blue' }}>test12</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
