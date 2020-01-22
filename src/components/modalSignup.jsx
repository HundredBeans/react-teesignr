import React from 'react';
import FormSignup from '../components/formSignup';

const ModalSignup = () => {
  return (
    <div
      className="modal fade"
      id="ModalSignup"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5
              className="modal-title align-content-center"
              id="exampleModalLongTitle"
            >
              Daftar
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <FormSignup />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalSignup;
