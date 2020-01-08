import React, { useContext } from 'react';
import AppContext from '../context/AppContext/AppContext';
import AuthContext from '../context/authContext/authContext';

const Collection = props => {
  const { clients, deleteClient, workers, deleteWorker } = useContext(
    AppContext
  );
  const { admin } = useContext(AuthContext);

  const handleDelete = id => {
    if (admin) {
      deleteWorker(id);
    } else {
      deleteClient(id);
    }
  };
  return (
    <ul className={`collection with-header ` + (props.admin ? 'col l7' : null)}>
      <li className='collection-header'>
        <h4>{'Clients'}</h4>
        <button className='waves-effect waves-light btn'>
          delete all clients
        </button>
      </li>
      {!admin &&
        clients.map(client => {
          return (
            <li key={client._id} className='collection-item avatar'>
              <i className='material-icons circle green'>person</i>
              <div>
                {client.name}
                <p>{client.email}</p>
                <p>{client.token}</p>
                <a href='#!' className='secondary-content'>
                  {props.admin && (
                    <i
                      onClick={() => handleDelete(client._id)}
                      className='material-icons'
                    >
                      close
                    </i>
                  )}
                </a>
              </div>
            </li>
          );
        })}
      {admin &&
        workers.map(worker => {
          return (
            <li key={worker._id} className='collection-item avatar'>
              <i className='material-icons circle green'>person</i>
              <div>
                {worker.username}
                <a href='#!' className='secondary-content'>
                  {props.admin && (
                    <i
                      onClick={() => handleDelete(worker._id)}
                      className='material-icons'
                    >
                      close
                    </i>
                  )}
                </a>
              </div>
            </li>
          );
        })}
    </ul>
  );
};
export default Collection;
