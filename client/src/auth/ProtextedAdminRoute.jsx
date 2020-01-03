import { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

const ProtectedAdminRoute = props => {
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    console.log(true);
    (async () => {
      const auth = await localStorage.getItem('auth');

      if (!auth) props.history.push('/');
      try {
        const rawResponse = await fetch('/user', {
          method: 'GET',
          headers: {
            auth: auth,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        });
        const content = await rawResponse.json();
        console.log(content.admin);

        if (content.admin === true) {
          setAllowed(true);
          console.log(false);
        } else {
          props.history.push('/clients');
        }
      } catch (error) {
        console.log(error);
      }
    })();
    // eslint-disable-next-line
  }, []);
  return allowed && props.children;
};

export default withRouter(ProtectedAdminRoute);
