import React from 'react';
import ReactModal from 'react-modal';

const Modal = ({ content, onClose }) => {
  return (
    <ReactModal
      isOpen={true}
      onRequestClose={onClose}
      contentLabel="Modal"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <h2>Láminas del sobre</h2>
      <div className="modal-card">
        {content.map((item, index) => (
          <div key={index} className="modal-card-item">
            <div>Categoría: {item.category}</div>
            <div>Sección: {item.section}</div>
            <div>Número: {item.number}</div>
            <div>Nombre del recurso: {item.resource}</div>
          </div>
        ))}
      </div>
      <button onClick={onClose} className="modal-close-button">
        Cerrar
      </button>
    </ReactModal>
  );
};

export default Modal;
