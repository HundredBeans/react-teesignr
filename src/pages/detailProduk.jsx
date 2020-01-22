import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import HeaderQuote from '../components/headerQuote';
import ModalLogin from '../components/modalLogin';
import ModalSignup from '../components/modalSignup';
import ModalRegisterToko from '../components/modalRegisterToko';
import ProductComponent from '../components/productComponent';
import NotFoundProduct from '../components/notFoundProduk';
import { actions, store } from '../store';
import { withRouter } from 'react-router-dom';
import { connect } from 'unistore/react';
import axios from 'axios';
import BackToTop from '../components/backToTop';

// import not found css
import '../style/nomatch.css';

class DetailProduk extends React.Component {
  axiosBarangId = () => {
    const req = {
      method: 'get',
      url: this.props.baseUrl + '/baju/' + this.props.match.params.id
    };
    axios(req)
      .then(function(response) {
        store.setState({
          detailNamaProduk: response.data.nama,
          detailNamaToko: response.data.penjual,
          detailUrlGambar: response.data.gambar,
          detailHargaProduk: response.data.harga,
          detailProdukTerjual: response.data.terjual,
          detailDeskripsiProduk: response.data.deskripsi,
          detailTokoId: response.data.toko_id,
          detailFound: true
        });
      })
      .catch(function(error) {
        store.setState({ detailFound: false });
      });
  };
  getTokoInfo = () => {
    const req = {
      method: 'get',
      url: this.props.baseUrl + `/toko/${this.props.detailTokoId}`
    };
    console.log('get toko');
    console.log(this.props.detailTokoId);
    const self = this;
    axios(req)
      .then(function(response) {
        store.setState({
          tokoNama: response.data.nama,
          tokoDeskripsi: response.data.deskripsi,
          tokoPopularitas: response.data.popularitas,
          isLoadingToko: false
        });
      })
      .catch(function(error) {});
  };
  componentDidMount() {
    this.axiosBarangId();
    store.setState({ isLoadingQuote: true });
    store.setState({ isLoadingToko: true });
    this.props.getRandomQuote();
    this.getTokoInfo();
    console.log(this.props.detailTokoId);
  }
  render() {
    // const productComponent = this.axiosBarangId();
    this.getTokoInfo();
    console.log('jalan');
    console.log(this.props.match.params);
    // console.log(productComponent);
    return (
      <body className="bgHome">
        <Header handleSearch={this.props.handleSearch} />
        <ModalLogin />
        <ModalRegisterToko />
        <ModalSignup />
        <HeaderQuote />
        <div className="container py-3 pb-5">
          <div className="row">
            <div className="col-md-3 pr-0 py-1 hide-img">
              <div
                class="card w-100"
                style={{
                  backgroundColor: '#1D2124'
                }}
              >
                <img
                  src={require('../img/storepic.jpg')}
                  class="card-img-top"
                  alt="..."
                />
                <div class="card-body" style={{ color: 'white' }}>
                  {this.props.isLoadingToko ? (
                    <span>Loading ...</span>
                  ) : (
                    <React.Fragment>
                      <h4
                        className="card-text text-center border-bottom pb-2"
                        style={{ fontWeight: 'bold' }}
                      >
                        {this.props.tokoNama}
                      </h4>
                      <span>Pop : {this.props.tokoPopularitas}</span>
                      <p className="card-text text-justify py-2">
                        {this.props.tokoDeskripsi}
                      </p>
                    </React.Fragment>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-9 col-sm-12">
              {this.props.detailFound ? (
                <ProductComponent
                  namaProduk={this.props.detailNamaProduk}
                  tokoId={this.props.detailTokoId}
                  namaToko={this.props.detailNamaToko}
                  urlFoto={this.props.detailUrlGambar}
                  hargaProduk={this.props.detailHargaProduk}
                  produkTerjual={this.props.detailProdukTerjual}
                  deskripsiProduk={this.props.detailDeskripsiProduk}
                  handleInput={e => this.props.handleInput(e)}
                />
              ) : (
                <NotFoundProduct />
              )}
            </div>
          </div>
        </div>
        <div className="pb-5"></div>
        <BackToTop />
        <Footer />
      </body>
    );
  }
}
export default connect(
  'quote, quoteAuthor, isLoadingQuote, searchKeyword, listBarangSearch, baseUrl, detailNamaProduk, detailNamaToko, detailUrlGambar, detailHargaProduk, detailProdukTerjual, detailDeskripsiProduk, detailFound, detailTokoId, tokoNama, tokoDeskripsi, tokoPopularitas, isLoadingToko',
  actions
)(withRouter(DetailProduk));
