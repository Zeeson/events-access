import React, { useReducer, useEffect } from 'react';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';

const AuthState = props => {
  const Auth = localStorage.getItem('auth');

  const initialState = {
    user: null,
    auth: false,
    admin: null,
    loading: true,
    token: null
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  useEffect(() => {
    console.log('ran');
    getUser();
    console.log('finished');
  }, []);
  useEffect(() => {
    if (state.auth) getUser();
  }, [state.auth]);

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
      if (rawResponse.status < 400) {
        dispatch({ type: 'SETTOKEN', payload: token });
      } else {
        dispatch({ type: 'OUT' });
        console.log(token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    dispatch({ type: 'OUT' });
  };

  const getUser = async () => {
    console.log('getUser');
    try {
      dispatch({ type: 'SETLOADING', payload: true });

      const rawResponse = await fetch('/user', {
        method: 'GET',
        headers: {
          auth: Auth,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const userData = await rawResponse.json();
      if (rawResponse.status < 400) {
        dispatch({ type: 'USER', payload: userData });
        // dispatch({ type: 'SETLOADING', payload: false });
      } else {
        console.log('cant get clients', userData);
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: 'SETLOADING', payload: false });
      console.log('dispatched false');
      // dispatch({ type: 'OUT' });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        auth: state.auth,
        admin: state.admin,
        loading: state.loading,
        token: state.token,
        getUser,
        logUser,
        logout
        // checkToken
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
