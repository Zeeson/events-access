import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../context/authContext/authContext';
import Spinner from '../components/Spinner';
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { auth } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props =>
        auth ? (
          <Component {...props} />
        ) : auth === null ? (
          <Spinner />
        ) : (
          <Redirect to='/login' />
        )
      }
    />
  );
};

export default ProtectedRoute;
