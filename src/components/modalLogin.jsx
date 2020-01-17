import React from 'react';
import FormLogin from './formLogin';

class ModalLogin extends React.Component {
  render() {
    return (
      <div
        className="modal fade"
        id="ModalLogin"
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
                Masuk
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
              <FormLogin />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ModalLogin;
