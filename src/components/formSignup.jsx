import React from 'react';
import axios from 'axios';
import { actions } from '../store';
import { withRouter } from 'react-router-dom';
import { connect } from 'unistore/react';
import swal from 'sweetalert';

class FormSignup extends React.Component {
  // close modal
  // closeModal = () => {
  //     $("#ModalSignup").modal("hide");
  // };
  // validate email
  validateEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log('store, ' + email);
    console.log(re.test(email));
    return re.test(email);
  };

  handleSignup = () => {
    let email = this.props.daftarEmail;
    console.log(this.validateEmail(email));
    // validate email
    if (this.validateEmail(this.props.daftarEmail) === false) {
      swal('Signup Gagal', 'Email tidak valid', 'warning');
      // return validasi jangan lewat alert
    }
    // validate password
    else if (this.props.daftarPassword.length < 6) {
      swal('Signup Gagal', 'Password minimal 6 karakter', 'warning');
      // return validasi jangan lewat alert
    }
    // validate login input
    else if (
      this.props.daftarFullName === '' ||
      this.props.daftarUsername === ''
    ) {
      swal('Signup Gagal', 'Form tidak boleh kosong', 'warning');
      // return validasi jangan lewat alert
    } else {
      const data = {
        full_name: this.props.daftarFullName,
        email: this.props.daftarEmail,
        username: this.props.daftarUsername,
        password: this.props.daftarPassword
      };
      swal({
        title: 'Register sedang diproses',
        text: 'Harap Tunggu',
        icon: 'info',
        buttons: false
      });
      console.log('login');
      // ditambahin error kalo udah solve
      axios
        .post(this.props.baseUrl + '/auth/register', data)
        .then(function(response) {
          // this.closeModal();
          console.log(response.data);
          swal('Register Sukses', 'Silahkan lakukan login', 'success');
          // console.log(response);
        })
        .catch(function(error) {
          swal('Register Gagal', error.response.data.message, 'warning');
        });
    }
  };
  render() {
    return (
      <div className="container">
        <form onSubmit={e => e.preventDefault(e)}>
          <div className="form-group row">
            <label for="daftarFullName" className="col-sm-4 col-form-label">
              Nama Lengkap
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                name="daftarFullName"
                className="form-control"
                id="daftarFullName"
                placeholder="Dobleh Kabur"
                onChange={e => this.props.handleInput(e)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              for="daftarEmail"
              className="col-sm-4 col-form-label"
              placeholder="dobleh@email.com"
            >
              E-Mail
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                name="daftarEmail"
                className="form-control"
                id="daftarEmail"
                placeholder="dobleh@email.com"
                onChange={e => this.props.handleInput(e)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label for="daftarUsername" className="col-sm-4 col-form-label">
              Username
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                name="daftarUsername"
                className="form-control"
                id="daftarUsername"
                placeholder="dobleh_theDestroyer"
                onChange={e => this.props.handleInput(e)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label for="daftarPassword" className="col-sm-4 col-form-label">
              Password
            </label>
            <div className="col-sm-8">
              <input
                type="password"
                name="daftarPassword"
                className="form-control"
                id="daftarPassword"
                onChange={e => this.props.handleInput(e)}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-12 py-1">
              <button
                type="submit"
                onClick={this.handleSignup}
                className="btn btn-dark btn-block"
                data-dismiss="modal"
              >
                Daftar
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default connect(
  'baseUrl, daftarFullName, daftarEmail, daftarUsername, daftarPassword',
  actions
)(withRouter(FormSignup));
