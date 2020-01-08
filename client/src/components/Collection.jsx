import React from 'react';
import CollectionItem from './Collection-Item';
import { withRouter } from 'react-router-dom';

const Collection = props => {
  const { data, admin } = props;

  return (
    <ul className={`collection with-header ` + (admin ? 'col l7' : null)}>
      <li className='collection-header'>
        <h4>
          {props.location.pathname === '/workers' ? 'Workers' : 'Clients'}
        </h4>
        {props.location.pathname !== '/' && (
          <button className='waves-effect waves-light btn'>
            delete all
            {props.location.pathname === '/workers' ? ' workers' : ' clients'}
          </button>
        )}
      </li>
      {data.map(col => {
        return (
          <CollectionItem
            key={col._id}
            admin={admin}
            data={col}
            onDelete={props.onDelete}
          />
        );
      })}
    </ul>
  );
};
export default withRouter(Collection);
