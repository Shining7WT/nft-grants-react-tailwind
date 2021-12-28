import React from 'react';
import './ElementModal.scss';

const ElementModal = ({ open, component, onClose }) => {
  return (
    <>
      <div className="modal-holder">
        <div className="info-modal">
          {component}
        </div>
        <div className="modal-cover" onClick={() => onClose()} />
      </div>
    </>
  );
};

export default ElementModal;
