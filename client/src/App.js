import React from 'react';
import Login from './pages/Login';
import Clients from './pages/Clients';
import Admin from './pages/Admin';
import Workers from './pages/Workers';
import { Switch, Route } from 'react-router-dom';
import ProtectedRoute from './auth/ProtectedRoute';
import AuthState from './context/authContext/AuthState';
import AppState from './context/AppContext/AppState';

function App() {
  return (
    <AuthState>
      <AppState>
        <div className='container'>
          <Switch>
            <Route exact path='/login' component={Login} />
            <ProtectedRoute exact path='/admin' component={Admin} />
            <ProtectedRoute exact path='/workers' component={Workers} />
            <ProtectedRoute exact path='/' component={Clients} />
          </Switch>
        </div>
      </AppState>
    </AuthState>
  );
}

export default App;
