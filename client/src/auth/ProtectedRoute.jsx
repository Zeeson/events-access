import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../context/AuthContext/AppContext';
import AppContext from '../context/AppContext/AppContext';
import Spinner from '../components/Spinner';
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { auth, loading } = useContext(AuthContext);
  const { getClients } = useContext(AppContext);

  useEffect(() => {
    auth && getClients();
    // eslint-disable-next-line
  }, [auth]);
  return (
    <Route
      {...rest}
      render={props =>
        auth && !loading ? (
          <Component {...props} />
        ) : loading === true ? (
          <Spinner />
        ) : (
          <Redirect to='/login' />
        )
      }
    />
  );
};

export default ProtectedRoute;
