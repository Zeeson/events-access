import { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

const ProtectedRoute = props => {
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const auth = await localStorage.getItem('auth');

        if (!auth) props.history.push('/');
        const rawResponse = await fetch('/user', {
          method: 'GET',
          headers: {
            auth: auth,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        });
        const content = await rawResponse.json();
        console.log(content);
        setAllowed(true);
      } catch (error) {
        console.log(error);
      }
    })();
    // eslint-disable-next-line
  }, []);
  return allowed && props.children;
};

export default withRouter(ProtectedRoute);
