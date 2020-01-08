import React from 'react';

const CollectionItem = props => {
  const {
    admin,
    data: { name, email, token, _id, username }
  } = props;
  return (
    <li className='collection-item avatar'>
      <i className='material-icons circle green'>person</i>
      <div>
        {!username && name}
        <p>{!username && email}</p>
        <p>{!username && token}</p>
        <p>{username && username}</p>

        <a href='#!' className='secondary-content'>
          {admin && (
            <i onClick={() => props.onDelete(_id)} className='material-icons'>
              close
            </i>
          )}
        </a>
      </div>
    </li>
  );
};

export default CollectionItem;
