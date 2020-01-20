import React from 'react';
import CollectionItem from './Collection-Item';
import { withRouter } from 'react-router-dom';
import Modal from './Modal';

const Collection = props => {
  const { data, admin } = props;
  const isWorker =
    props.location.pathname === '/workers' ? 'Workers' : 'Clients';
  return (
    <ul className={`collection with-header ` + (admin ? 'col l7' : null)}>
      <li className='collection-header'>
        <h4 className='coll-header'>{isWorker}</h4>
        {data.length > 0 && props.location.pathname !== '/' && (
          <Modal isWorker={isWorker} handleModal={props.handleModal} />
        )}
      </li>
      {data.length > 0 ? (
        data.map(col => {
          return (
            <CollectionItem
              key={col._id}
              admin={admin}
              data={col}
              onDelete={props.onDelete}
            />
          );
        })
      ) : (
        <div>
          You have not added a{' '}
          {props.location.pathname === '/workers' ? 'worker' : 'client'}
        </div>
      )}
    </ul>
  );
};
export default withRouter(Collection);
