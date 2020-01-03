import React, { useState } from 'react';

function Login(props) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const handleSubmit = async e => {
    e.preventDefault();
    if (formData.username.length < 1 || formData.password.length < 6) return;
    try {
      const rawResponse = await fetch('/auth', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (rawResponse.status === 200) {
        const content = await rawResponse.text();
        localStorage.setItem('auth', content);
        props.history.push('/clients');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
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
