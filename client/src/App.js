import React from 'react';
import Login from './pages/Login';
import Clients from './pages/Clients';
import Admin from './pages/Admin';
import { Switch, Route } from 'react-router-dom';
import ProtectedRoute from './auth/ProtectedRoute';
import ProtextedAdminRoute from './auth/ProtextedAdminRoute';

function App() {
  return (
    <div className='container  '>
      <Switch>
        <Route exact path='/' component={Login} />
        {/* <ProtextedAdminRoute> */}
        <Route exact path='/admin' component={Admin} />
        <Route exact path='/clients' component={Clients} />
        {/* </ProtextedAdminRoute> */}
      </Switch>
    </div>
  );
}

export default App;
