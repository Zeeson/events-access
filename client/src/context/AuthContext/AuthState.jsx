import React, { useReducer, useEffect } from 'react';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import Toast from '../../Util/Toast';

const AuthState = props => {
  const initialState = {
    user: null,
    auth: false,
    admin: null,
    loading: true,
    token: null
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (state.auth) getUser();
    // eslint-disable-next-line
  }, [state.auth]);

  const logUser = async formData => {
    try {
      const rawResponse = await fetch('/api/auth', {
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
        Toast('Logged in successfully');
      } else {
        dispatch({ type: 'OUT' });
        Toast(token);
      }
    } catch (error) {
      console.log(error);
      Toast('Oops, something went wrong');
    }
  };

  const logout = () => {
    dispatch({ type: 'OUT' });
    Toast('Logged out');
  };

  const getUser = async () => {
    console.log('getUser');
    try {
      dispatch({ type: 'SETLOADING', payload: true });

      const rawResponse = await fetch('/api/user', {
        method: 'GET',
        headers: {
          auth: localStorage.auth,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const userData = await rawResponse.json();
      if (rawResponse.status < 400) {
        dispatch({ type: 'USER', payload: userData });
        // dispatch({ type: 'SETLOADING', payload: false });
      } else {
        Toast();
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: 'SETLOADING', payload: false });
      // Toast();
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
