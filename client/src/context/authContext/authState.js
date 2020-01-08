import React, { useReducer, useEffect } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
const auth = localStorage.getItem('auth');

const AuthState = props => {
  const initialState = {
    user: null,
    auth: null,
    admin: false
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  useEffect(() => {
    getUser();
  }, []);

  //logout
  const logout = () => {
    dispatch({ type: 'OUT' });
  };

  //get User gets userdata
  const getUser = async () => {
    try {
      if (!auth) {
        dispatch({ type: 'OUT' });
        return;
      }
      const rawResponse = await fetch('/user', {
        method: 'GET',
        headers: {
          auth: auth,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const userData = await rawResponse.json();
      dispatch({ type: 'USER', payload: userData });
    } catch (error) {
      console.log(error);
      dispatch({ type: 'OUT' });
    }
  };
  //login user gets token
  const logUser = async formData => {
    try {
      const rawResponse = await fetch('/auth', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const token = await rawResponse.text();
      dispatch({ type: 'SETTOKEN', payload: token });
    } catch (error) {
      console.log(error);
      dispatch({ type: 'OUT' });
    }
  };

  //check if token returns a user
  const checkToken = async () => {
    if (!auth) {
      dispatch({ type: 'OUT' });
      return;
    }
    try {
      const rawResponse = await fetch('/token', {
        method: 'GET',
        headers: {
          auth: auth,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const token = await rawResponse.text();
      console.log(token);
      dispatch({ type: 'TOKENEXIST' });
    } catch (error) {
      console.log(error);
      dispatch({ type: 'OUT' });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        auth: state.auth,
        admin: state.admin,
        getUser,
        logUser,
        logout,
        checkToken
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
