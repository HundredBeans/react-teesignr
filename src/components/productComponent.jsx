import React from 'react';
import { actions, store } from '../store';
import { withRouter } from 'react-router-dom';
import { connect } from 'unistore/react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import swal from 'sweetalert';

class ProductComponent extends React.Component {
  handleBuy = () => {
    if (
      localStorage.getItem('isLogin') !== null &&
      this.props.beliUkuran !== '' &&
      this.props.beliJumlah !== ''
    ) {
      const req = {
        method: 'post',
        url: this.props.baseUrl + '/baju/' + this.props.match.params.id,
        data: {
          jumlah: this.props.beliJumlah,
          ukuran: this.props.beliUkuran
        },
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      };
      console.log('buy');
      const self = this;
      Axios(req).then(function(response) {
        store.setState({ beliUkuran: '', beliJumlah: '' });
        swal(
          'Barang Berhasil dibeli',
          'Silahkan lanjutkan konfirmasi pemesanan',
          'success'
        );
        self.props.history.push('/checkout');
      });
    } else if (localStorage.getItem('isLogin') === null) {
      swal('Gagal', 'Kamu belum login', 'warning');
    } else {
      swal('Gagal', 'Tolong isi ukuran dan jumlah terlebih dahulu', 'warning');
    }
  };
  handleAddToCart = () => {
    if (
      localStorage.getItem('isLogin') !== null &&
      this.props.beliUkuran !== '' &&
      this.props.beliJumlah !== ''
    ) {
      const req = {
        method: 'put',
        url: this.props.baseUrl + '/baju/' + this.props.match.params.id,
        data: {
          jumlah: this.props.beliJumlah,
          ukuran: this.props.beliUkuran
        },
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      };
      console.log('add to cart');
      const self = this;
      Axios(req).then(function(response) {
        store.setState({ beliUkuran: '', beliJumlah: '' });
        swal('Sukses', 'Barang ditambah ke Keranjang', 'success');
        self.props.history.push('/keranjang');
      });
    } else if (localStorage.getItem('isLogin') === null) {
      swal('Gagal', 'Kamu belum login', 'warning');
    } else {
      swal('Gagal', 'Tolong isi ukuran dan jumlah terlebih dahulu', 'warning');
    }
  };
  render() {
    return (
      <div
        className="container rounded-lg"
        style={{ backgroundColor: '#f2f6f5', color: 'black' }}
      >
        <div className="row text-center">
          <div className="col-md-12 border-bottom py-3">
            <h3 style={{ fontWeight: 'bold' }}>{this.props.namaProduk}</h3>
          </div>
        </div>
        <div className="row text-center">
          <div className="col-md-12 border-bottom py-1">
            <Link
              to={`/toko/${this.props.tokoId}`}
              className="btn btn-light border-bottom w-100"
            >
              <h4
                style={{
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  color: 'black'
                }}
              >
                {this.props.namaToko}
              </h4>
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="container">
            <div className="row">
              <div className="col-md-6 py-3">
                <img
                  src={this.props.urlFoto}
                  className="w-100 border rounded-lg"
                />
              </div>
              <div className="col-md-6 pr-lg-5">
                <div className="row">
                  <div className="col-md-12 text-center py-3 border-bottom">
                    <h3 style={{ fontWeight: 'bold' }}>
                      {this.props.hargaProduk.replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        '.'
                      )}
                    </h3>
                  </div>
                </div>
                <div className="row py-3">
                  <div className="col-md-6 text-left">
                    <span>Deskripsi</span>
                  </div>
                  <div className="col-md-6 text-right">
                    <span>Terjual : {this.props.produkTerjual}</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 border-bottom">
                    <p>{this.props.deskripsiProduk}</p>
                  </div>
                </div>
                <form>
                  <div className="row pb-3 border-bottom">
                    <div className="col-md-6">
                      <label for="beliUkuran" className="col-md-12 px-0 m-0">
                        Ukuran
                      </label>
                      <div className="col-md-12 px-0">
                        <select
                          className="form-control"
                          id="beliUkuran"
                          name="beliUkuran"
                          onChange={e => this.props.handleInput(e)}
                        >
                          <option value=""></option>
                          <option value="S">S</option>
                          <option value="M">M</option>
                          <option value="L">L</option>
                          <option value="XL">XL</option>
                          <option value="XXL">XXL</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label for="beliJumlah" className="col-md-12 px-0 m-0">
                        Jumlah
                      </label>
                      <div className="col-md-12 px-0">
                        <select
                          className="form-control"
                          id="beliJumlah"
                          name="beliJumlah"
                          onChange={e => this.props.handleInput(e)}
                        >
                          <option value=""></option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6"></div>
                  </div>
                </form>
                <div className="row pt-3">
                  <div className="col-md-6">
                    <button
                      type="button"
                      className="btn btn-dark w-100"
                      onClick={this.handleAddToCart}
                    >
                      Add to Cart <i className="fa fa-fw fa-angle-right"></i>
                    </button>
                  </div>
                  <div className="col-md-6">
                    <button
                      type="button"
                      className="btn btn-dark w-100"
                      onClick={this.handleBuy}
                    >
                      Buy <i className="fa fa-fw fa-angle-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(
  'baseUrl, beliUkuran, beliJumlah',
  actions
)(withRouter(ProductComponent));
