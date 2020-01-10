import React, { useReducer, useEffect } from 'react';
import AppContext from './AppContext';
import AppReducer from './AppReducer';

const Auth = localStorage.auth;
const AppState = props => {
  const initialState = { clients: [], workers: [], loading: null };
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const getClients = async () => {
    console.log('start get gliennts');
    dispatch({ type: 'LOADING', payload: true });

    try {
      const rawResponse = await fetch('/client', {
        method: 'GET',
        headers: {
          auth: localStorage.auth,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const clients = await rawResponse.json();
      dispatch({ type: 'CLIENTS', payload: clients });
      dispatch({ type: 'LOADING', payload: false });
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

  const clearState = () => {
    dispatch({ type: 'CLEARSTATE' });
  };
  return (
    <AppContext.Provider
      value={{
        clients: state.clients,
        workers: state.workers,
        loading: state.loading,
        getClients,
        addClient,
        deleteClient,
        addWorker,
        getWorkers,
        deleteWorker,
        clearState
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
