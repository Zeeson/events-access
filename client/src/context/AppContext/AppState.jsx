import React, { useReducer } from 'react';
import AppContext from './AppContext';
import AppReducer from './AppReducer';
import { withRouter } from 'react-router-dom';
import Toast from '../../Util/Toast';

const AppState = props => {
  const initialState = {
    clients: [],
    workers: [],
    filtered: [],
    loading: null,
    filter: false
  };
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
          auth: localStorage.auth,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const res = await rawResponse.json();
      console.log(res);
      getClients();
      Toast('Client Added');
    } catch (error) {
      console.log(error);
      Toast();
    }
  };
  //delete cliemt
  const deleteClient = async id => {
    try {
      const rawResponse = await fetch(`/admin/client/${id}`, {
        method: 'DELETE',
        headers: {
          auth: localStorage.auth,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const res = await rawResponse.text();
      console.log(res);
      getClients();
      Toast('Client Deleted');
    } catch (error) {
      console.log(error);
      Toast();
    }
  };
  //add worker
  const addWorker = async data => {
    try {
      const rawResponse = await fetch('/admin/worker', {
        method: 'POST',
        headers: {
          auth: localStorage.auth,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const res = await rawResponse.json();
      console.log(res);
      getWorkers();
      Toast("Worker Added")
    } catch (error) {
      console.log(error);
      Toast()
    }
  };
  //getworker
  const getWorkers = async () => {
    try {
      const rawResponse = await fetch('/admin/worker', {
        method: 'GET',
        headers: {
          auth: localStorage.auth,
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
          auth: localStorage.auth,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const res = await rawResponse.text();
      console.log(res);
      getWorkers();
      Toast("Worker deleted")
    } catch (error) {
      console.log(error);
      Toast()
    }
  };

  const clearState = () => {
    dispatch({ type: 'CLEARSTATE' });
  };

  const filterState = payload => {
    if (props.location.pathname === '/workers') {
      const workers = state.workers.filter(worker => {
        return worker.username.includes(payload);
      });
      dispatch({ type: 'FILTERWORKERS', payload: workers });
    } else {
      const clients = state.clients.filter(client => {
        return (
          client.name.includes(payload) ||
          client.email.includes(payload) ||
          client.token.includes(payload)
        );
      });
      dispatch({ type: 'FILTERWORKERS', payload: clients });
    }
  };
  const isSearch = payload => {
    payload.length < 1
      ? dispatch({ type: 'FILTER', payload: false })
      : dispatch({ type: 'FILTER', payload: true });
  };
  return (
    <AppContext.Provider
      value={{
        clients: state.clients,
        workers: state.workers,
        loading: state.loading,
        filtered: state.filtered,
        filter: state.filter,
        getClients,
        addClient,
        deleteClient,
        addWorker,
        getWorkers,
        deleteWorker,
        clearState,
        filterState,
        isSearch
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default withRouter(AppState);
