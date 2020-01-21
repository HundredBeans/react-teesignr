import React from 'react';
import FormRegisterToko from '../components/formRegisterToko';

const ModalRegisterToko = () => {
  return (
    <div
      className="modal fade"
      id="ModalRegisterToko"
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
              Daftar Toko
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
            <FormRegisterToko />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalRegisterToko;
