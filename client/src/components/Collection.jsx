import React from 'react';
import CollectionItem from './Collection-Item';
import { withRouter, Link } from 'react-router-dom';
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
      ) : props.location.pathname === '/' && admin === true ? (
        <Link to='/admin'>
          <button className='waves-effect waves-light btn blue '>
            Add Client
          </button>
        </Link>
      ) : (
        <div>
          {props.location.pathname === '/workers' ? 'Worker' : 'Clients'} have
          not been added
        </div>
      )}
    </ul>
  );
};
export default withRouter(Collection);
