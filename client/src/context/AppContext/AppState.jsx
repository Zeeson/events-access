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
    filter: false,
    current: false
  };
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const getClients = async () => {
    dispatch({ type: 'LOADING', payload: true });
    try {
      const rawResponse = await fetch('/api/client', {
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
      dispatch({ type: 'LOADING', payload: false });
    }
  };
  //add client
  const addClient = async data => {
    dispatch({ type: 'CLEAR_CURRENT', payload: false });

    try {
      const rawResponse = await fetch('/api/admin/client', {
        method: 'POST',
        headers: {
          auth: localStorage.auth,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const res = await rawResponse.json();
      if (rawResponse.status < 400) {
        dispatch({ type: 'CLEAR_CURRENT', payload: true });

        getClients();
        Toast('Client Added');
      } else {
        dispatch({ type: 'CLEAR_CURRENT', payload: false });
        Toast(res);
      }
    } catch (error) {
      dispatch({ type: 'CLEAR_CURRENT', payload: false });
      console.log(error);
      Toast();
    }
  };
  //delete cliemt
  const deleteClient = async id => {
    try {
      const rawResponse = await fetch(`/api/admin/client/${id}`, {
        method: 'DELETE',
        headers: {
          auth: localStorage.auth,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const res = await rawResponse.text();
      getClients();
      Toast('Client Deleted');
    } catch (error) {
      console.log(error);
      Toast();
    }
  };
  //add worker
  const addWorker = async data => {
    dispatch({ type: 'CLEAR_CURRENT', payload: false });
    try {
      const rawResponse = await fetch('/api/admin/worker', {
        method: 'POST',
        headers: {
          auth: localStorage.auth,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (rawResponse.status < 400) {
        const res = await rawResponse.json();
        getWorkers();
        Toast('Worker Added');
        dispatch({ type: 'CLEAR_CURRENT', payload: true });
      } else {
        const res = await rawResponse.text();
        Toast(res);
      }
    } catch (error) {
      dispatch({ type: 'CLEAR_CURRENT', payload: false });
      console.log(error);
      Toast();
    }
  };
  //getworker
  const getWorkers = async () => {
    dispatch({ type: 'LOADING', payload: true });

    try {
      const rawResponse = await fetch('/api/admin/worker', {
        method: 'GET',
        headers: {
          auth: localStorage.auth,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const workers = await rawResponse.json();
      dispatch({ type: 'WORKERS', payload: workers });
      dispatch({ type: 'LOADING', payload: false });
    } catch (error) {
      console.log(error);
      dispatch({ type: 'LOADING', payload: false });
    }
  };
  //delete  worker
  const deleteWorker = async id => {
    try {
      const rawResponse = await fetch(`/api/admin/worker/${id}`, {
        method: 'DELETE',
        headers: {
          auth: localStorage.auth,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const res = await rawResponse.text();
      getWorkers();
      Toast('Worker deleted');
    } catch (error) {
      console.log(error);
      Toast();
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
  const deleteClients = async () => {
    try {
      const rawResponse = await fetch(`/api/admin/client/`, {
        method: 'DELETE',
        headers: {
          auth: localStorage.auth,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const res = await rawResponse.text();
      getClients();
      Toast('All Clients Deleted');
    } catch (error) {
      console.log(error);
      Toast();
    }
  };
  const deleteWorkers = async () => {
    try {
      const rawResponse = await fetch(`/api/admin/worker/`, {
        method: 'DELETE',
        headers: {
          auth: localStorage.auth,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const res = await rawResponse.text();
      getWorkers();
      Toast('All Workers Deleted');
    } catch (error) {
      console.log(error);
      Toast();
    }
  };
  return (
    <AppContext.Provider
      value={{
        clients: state.clients,
        workers: state.workers,
        loading: state.loading,
        filtered: state.filtered,
        filter: state.filter,
        clearCurrent: state.current,
        getClients,
        addClient,
        deleteClient,
        deleteClients,
        addWorker,
        getWorkers,
        deleteWorker,
        deleteWorkers,
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
