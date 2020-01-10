import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../context/authContext/AuthContext';
import Spinner from '../components/Spinner';
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { auth, loading } = useContext(AuthContext);

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
