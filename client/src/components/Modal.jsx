import React, { Fragment, useRef, useEffect } from 'react';
import M from 'materialize-css';

const Modal = props => {
  const { isWorker, handleModal } = props;
  const Modal = useRef();
  useEffect(() => {
    const options = {};
    M.Modal.init(Modal.current, options);
  }, []);
  return (
    <Fragment>
      <button
        className='waves-effect waves-light btn blue modal-trigger'
        data-target='modal1'
      >
        delete all {isWorker}
      </button>
      <div id='modal1' className='modal' ref={Modal}>
        <div className='modal-content'>
          <h4>Are you sure you want to delete all {isWorker}</h4>
        </div>
        <div className='modal-footer'>
          <a
            onClick={handleModal}
            className='modal-close waves-effect waves-green btn-flat'
          >
            Yes
          </a>
          <a
            onClick={handleModal}
            className='modal-close waves-effect waves-green btn-flat'
          >
            No
          </a>
        </div>
      </div>
    </Fragment>
  );
};

export default Modal;
