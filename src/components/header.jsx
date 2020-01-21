import React from 'react';
import { Link } from 'react-router-dom';
import { actions, store } from '../store';
import { withRouter } from 'react-router-dom';
import { connect } from 'unistore/react';
import axios from 'axios';

class Header extends React.Component {
  handleSearch = () => {
    store.setState({ isLoadingSearch: true });
    const req = {
      method: 'get',
      url: this.props.baseUrl + '/baju?search=' + this.props.searchKeyword
    };
    console.log('search', this.props.searchKeyword);
    const self = this;
    axios(req).then(function(response) {
      store.setState({
        listBarangSearch: response.data,
        isLoadingSearch: false,
        pageBarang: 1,
        pageToko: 1
      });
      console.log(response.data);
      console.log(self.props.listBarangSearch);
    });
  };
  handleLogout = () => {
    localStorage.clear();
    alert('kamu telah keluar');
    this.props.history.push('/');
  };
  componentDidMount() {
    this.props.getUserInfo(localStorage.getItem('token'));
  }
  render() {
    return (
      <nav
        class="navbar navbar-expand-lg navbar-light bg-light navbar-fixed-top border border-bottom"
        style={{ fontFamily: 'Courier', backgroundColor: '#1D2124' }}
      >
        <div className="container-fluid">
          <Link to="/">
            <a class="navbar-brand mr-5">TEESIGNR</a>
          </Link>
          <form class="form-inline my-2 my-lg-0 w-100 d-lg-inline mr-5">
            <div className="input-group">
              <input
                class="form-control my-2 my-sm-0"
                type="search"
                placeholder="Cari T-Shirt"
                aria-label="Search"
                name="searchKeyword"
                onChange={e => this.props.handleInput(e)}
              />
              <Link to="/hasil">
                <button
                  class="btn btn-dark my-2 my-sm-0"
                  type="submit"
                  onClick={this.handleSearch}
                >
                  <i class="fa fa-fw fa-search"></i>
                </button>
              </Link>
            </div>
          </form>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav navbar-right ml-auto">
              {/* KELUAR JIKA SUDAH LOGIN */}
              {localStorage.getItem('isLogin') !== null ? (
                <React.Fragment>
                  <li class="nav-item dropdown mx-1">
                    <a
                      class="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {localStorage.getItem('namaUserLogin') === null
                        ? this.props.namaUserLogin
                        : localStorage.getItem('namaUserLogin')}
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                      <Link to="/keranjang" className="dropdown-item">
                        Keranjang
                      </Link>
                      <Link to="/checkout" className="dropdown-item">
                        Checkout
                      </Link>
                      {localStorage.getItem('punyaToko') === 'true' ? (
                        <Link
                          to={`/toko/${this.props.infoToko.id}`}
                          className="dropdown-item"
                        >
                          Toko
                        </Link>
                      ) : (
                        <a
                          class="nav-link"
                          href="#"
                          data-toggle="modal"
                          data-target="#ModalRegisterToko"
                          className="dropdown-item"
                        >
                          Toko <span class="sr-only">(current)</span>
                        </a>
                      )}
                      <Link to="/profil" className="dropdown-item">
                        Profil
                      </Link>
                      <div class="dropdown-divider"></div>
                      <a
                        class="dropdown-item"
                        href="#"
                        onClick={this.handleLogout}
                      >
                        Keluar
                      </a>
                    </div>
                  </li>
                  <li class="nav-item mx-1">
                    {localStorage.getItem('punyaToko') !== null ? (
                      <Link to="/jual" class="nav-link">
                        JUAL
                      </Link>
                    ) : (
                      <a
                        class="nav-link"
                        href="#"
                        data-toggle="modal"
                        data-target="#ModalRegisterToko"
                      >
                        JUAL <span class="sr-only">(current)</span>
                      </a>
                    )}
                  </li>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <li class="nav-item mx-1">
                    <a
                      class="nav-link"
                      data-toggle="modal"
                      data-target="#ModalSignup"
                    >
                      DAFTAR{' '}
                    </a>
                  </li>
                  <li class="nav-item mx-1">
                    <a
                      class="nav-link"
                      data-toggle="modal"
                      data-target="#ModalLogin"
                    >
                      MASUK{' '}
                    </a>
                  </li>
                </React.Fragment>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
export default connect(
  'searchKeyword, listBarangSearch, baseUrl, infoToko, pageBarang, namaUserLogin',
  actions
)(withRouter(Header));
