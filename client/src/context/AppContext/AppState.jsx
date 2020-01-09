import React, { useReducer, useEffect, useContext } from 'react';
import AppContext from './AppContext';
import AuthContext from '../authContext/authContext';

import AppReducer from './AppReducer';
const Auth = localStorage.getItem('auth');

const AppState = props => {
  const { admin, auth } = useContext(AuthContext);

  useEffect(() => {
    if (admin) getWorkers();
    if (auth) getClients();
  }, [admin, auth]);

  const initialState = { clients: [], workers: [] };
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const getClients = async () => {
    try {
      const rawResponse = await fetch('/client', {
        method: 'GET',
        headers: {
          auth: Auth,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const clients = await rawResponse.json();
      console.log(clients);
      dispatch({ type: 'CLIENTS', payload: clients });
    } catch (error) {
      console.log(error);
      // dispatch({ type: 'OUT' });
    }
  };
  //add client
  const addClient = async data => {
    try {
      const rawResponse = await fetch('/admin/client', {
        method: 'POST',
        headers: {
          auth: Auth,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const res = await rawResponse.json();
      console.log(res);
      getClients();
    } catch (error) {
      console.log(error);
      // dispatch({ type: 'OUT' });
    }
  };
  //delete cliemt
  const deleteClient = async id => {
    try {
      const rawResponse = await fetch(`/admin/client/${id}`, {
        method: 'DELETE',
        headers: {
          auth: Auth,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const res = await rawResponse.text();
      console.log(res);
      getClients();
    } catch (error) {
      console.log(error);

      // dispatch({ type: 'OUT' });
    }
  };
  //add worker
  const addWorker = async data => {
    try {
      const rawResponse = await fetch('/admin/worker', {
        method: 'POST',
        headers: {
          auth: Auth,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const res = await rawResponse.json();
      console.log(res);
      getWorkers();
    } catch (error) {
      console.log(error);
      // dispatch({ type: 'OUT' });
    }
  };
  //getworker
  const getWorkers = async () => {
    try {
      const rawResponse = await fetch('/admin/worker', {
        method: 'GET',
        headers: {
          auth: Auth,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const workers = await rawResponse.json();
      console.log(workers);
      dispatch({ type: 'WORKERS', payload: workers });
    } catch (error) {
      console.log(error);
      // dispatch({ type: 'OUT' });
    }
  };
  //delete  worker
  const deleteWorker = async id => {
    try {
      const rawResponse = await fetch(`/admin/worker/${id}`, {
        method: 'DELETE',
        headers: {
          auth: Auth,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const res = await rawResponse.text();
      console.log(res);
      getWorkers();
    } catch (error) {
      console.log(error);

      // dispatch({ type: 'OUT' });
    }
  };
  return (
    <AppContext.Provider
      value={{
        clients: state.clients,
        workers: state.workers,
        getClients,
        addClient,
        deleteClient,
        addWorker,
        getWorkers,
        deleteWorker
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
