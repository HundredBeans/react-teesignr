import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import HeaderQuote from '../components/headerQuote';
import ModalLogin from '../components/modalLogin';
import ModalSignup from '../components/modalSignup';
import ModalRegisterToko from '../components/modalRegisterToko';
import { actions, store } from '../store';
import { withRouter } from 'react-router-dom';
import { connect } from 'unistore/react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import BackToTop from '../components/backToTop';
import swal from 'sweetalert';

class KeranjangPage extends React.Component {
  // axios untuk get list keranjang
  getListKeranjang = () => {
    const req = {
      method: 'get',
      url: this.props.baseUrl + '/keranjang',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    };
    const self = this;
    Axios(req)
      .then(function(response) {
        store.setState({ listKeranjang: response.data });
        console.log(response.data);
      })
      .catch(function(error) {
        swal('Tidak Diizinkan', 'Kamu tidak bisa akses halaman ini', 'warning');
        self.props.history.push('/notfound');
      });
  };
  // axios untuk edit keranjang
  handleDeleteKeranjang = id => {
    const req = {
      method: 'delete',
      url: this.props.baseUrl + '/keranjang',
      data: {
        id: id
      },
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    };
    const self = this;
    console.log('delete');
    Axios(req).then(function(response) {
      self.getListKeranjang();
    });
  };
  // handle checkout
  handleKeranjangCheckout = () => {
    const req = {
      method: 'put',
      url: this.props.baseUrl + '/keranjang',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    };
    const self = this;
    Axios(req).then(function(response) {
      swal('Sukses', 'Silahkan lakukan checkout', 'success');
      self.props.history.push('/checkout');
    });
  };
  componentDidMount() {
    store.setState({ isLoadingQuote: true });
    this.props.getRandomQuote();
    // axios untuk get list keranjang
    this.getListKeranjang();
  }
  render() {
    const loopKeranjang = this.props.listKeranjang.map(value => (
      <div className="row py-3 px-sm-5">
        <div className="container mx-lg-5 border rounded-lg">
          <div className="row py-1 border-top">
            <div className="col-md-5 col-sm-5">
              <span>Nama Produk</span>
            </div>
            <div className="col-md-5 col-sm-5">
              <span>: {value.nama_barang}</span>
            </div>
            <div className="col-md-2 col-sm-2">
              <button
                type="button"
                class="close"
                aria-label="Close"
                onClick={() => this.handleDeleteKeranjang(value.id)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
          <div className="row py-1 border-top">
            <div className="col-md-5 col-sm-5">
              <span>Harga</span>
            </div>
            <div className="col-md-5 col-sm-5">
              <span>: Rp. {value.total_harga}</span>
            </div>
            <div className="col-md-2"></div>
          </div>
          <div className="row py-1 border-top">
            <div className="col-md-5 col-sm-5">
              <span>Jumlah</span>
            </div>
            <div className="col-md-5 col-sm-5">
              <span>: {value.jumlah} pcs</span>
            </div>
            <div className="col-md-2"></div>
          </div>
          <div className="row py-1 border-top">
            <div className="col-md-5 col-sm-5">
              <span>Ukuran</span>
            </div>
            <div className="col-md-5 col-sm-5">
              <span>: {value.ukuran}</span>
            </div>
            <div className="col-md-2"></div>
          </div>
          <div className="row py-1 border-top">
            <div className="col-md-12 text-center">
              <Link to={`/detail-produk/${value.barang_id}`}>
                <button
                  type="submit"
                  className="btn btn-dark"
                  onClick={() => this.handleDeleteKeranjang(value.id)}
                >
                  EDIT
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    ));
    return (
      <body class="bgHome">
        <Header handleSearch={this.props.handleSearch} />
        <ModalLogin />
        <ModalRegisterToko />
        <ModalSignup />
        <HeaderQuote />
        <div className="container-fluid pb-lg-5">
          <div className="row">
            <div className="col-md-2 col-sm-0"></div>
            <div className="col-md-8 col-sm-12">
              <div className="container py-3">
                <div
                  class="card"
                  style={{
                    backgroundColor: '#F7F7F7'
                  }}
                >
                  <div class="card-header text-center">
                    Copyright &copy; 2020 TEESIGNR.
                  </div>
                  <div class="card-body text-center border-bottom py-auto">
                    <div className="row">
                      <h4 class="card-title mx-auto">
                        <b>KERANJANG</b>
                      </h4>
                    </div>
                  </div>
                  <div className="container">
                    {loopKeranjang}
                    <div className="row">
                      <div className="col-6 text-left py-2 pl-5">
                        <button
                          type="submit"
                          className="btn btn-dark"
                          onClick={() => this.handleDeleteKeranjang(0)}
                        >
                          HAPUS SEMUA
                        </button>
                      </div>
                      <div className="col-6 text-right pr-5 py-2">
                        <button
                          type="submit"
                          className="btn btn-dark"
                          onClick={this.handleKeranjangCheckout}
                        >
                          CHECKOUT
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-2 col-sm-0"></div>
          </div>
        </div>
        <BackToTop />
        <Footer />
      </body>
    );
  }
}
export default connect(
  'baseUrl, isLoadingQuote, listCheckout, baseUrl, listKeranjang, listIdKeranjang',
  actions
)(withRouter(KeranjangPage));
