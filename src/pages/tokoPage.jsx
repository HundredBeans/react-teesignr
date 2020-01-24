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
import axios from 'axios';
import TextTruncate from 'react-text-truncate';
import { Link } from 'react-router-dom';
import BackToTop from '../components/backToTop';

class TokoPage extends React.Component {
  handleNext = async () => {
    await store.setState({ pageToko: this.props.pageToko * 1 + 1 });
    this.getTokoInfo();
  };
  handleBack = async () => {
    await store.setState({ pageToko: this.props.pageToko * 1 - 1 });
    this.getTokoInfo();
  };
  getTokoInfo = async () => {
    store.setState({ pageToko: this.props.pageToko });
    const req = {
      method: 'get',
      url:
        this.props.baseUrl +
        `/toko/${this.props.match.params.id}` +
        '?p=' +
        this.props.pageToko
    };
    console.log('get toko');
    await axios(req).then(function(response) {
      store.setState({
        tokoNama: response.data.nama,
        tokoDeskripsi: response.data.deskripsi,
        tokoPopularitas: response.data.popularitas,
        tokoListBarang: response.data['daftar jualan']
      });
    });
  };
  componentDidMount() {
    store.setState({ isLoadingQuote: true });
    this.props.getRandomQuote();
    this.getTokoInfo();
  }
  componentWillUnmount() {
    store.setState({ pageToko: 1 });
  }
  render() {
    const loopBarangToko = this.props.tokoListBarang.map(value => (
      <div className="col-md-3 px-auto pb-4 col-sm-4">
        <div class="card cardItem text-center">
          <img
            src={value.gambar}
            class="card-img-top img-fluid"
            alt="..."
            style={{ width: '100%', height: '30vh', objectFit: 'cover' }}
          />
          <Link to={'/detail-produk/' + value.id}>
            <span
              class="btn btn-light border-bottom"
              style={{ color: 'black' }}
            >
              <TextTruncate line={2} truncateText="…" text={value.nama} />
            </span>
          </Link>
          <span className="text-center py-1">{value.harga}</span>
        </div>
      </div>
    ));
    return (
      <body className="bgHome">
        <Header handleSearch={this.props.handleSearch} />
        <ModalLogin />
        <ModalRegisterToko />
        <ModalSignup />
        <HeaderQuote />
        <div className="container">
          <div className="row">
            <div className="col-md-3 pr-0 py-3">
              <div
                class="card w-100"
                style={{
                  backgroundColor: '#f2f6f5'
                }}
              >
                <img
                  src={require('../img/storepic.jpg')}
                  class="card-img-top"
                  alt="..."
                />
                <div class="card-body" style={{ color: 'black' }}>
                  <h4
                    className="card-text text-center border-bottom pb-2"
                    style={{ fontWeight: 'bold' }}
                  >
                    {this.props.tokoNama}
                  </h4>
                  <span>Pop score : {this.props.tokoPopularitas}</span>
                  <p className="card-text text-justify border-top py-2">
                    {this.props.tokoDeskripsi}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-9 py-3">
              <div class="card" style={{ backgroundColor: '#f2f6f5' }}>
                <div class="card-header border-bottom">
                  <span
                    className="border-bottom border-dark"
                    style={{ color: 'black' }}
                  >
                    Menampilkan
                    <i class="fa fa-fw fa-angle-right"></i>
                    {' ' + this.props.tokoNama}
                  </span>
                </div>
                <div class="card-body">
                  <div className="row">{loopBarangToko}</div>
                  <div className="row">
                    <div className="col-md-6">
                      {this.props.pageToko > 1 ? (
                        <button
                          type="button"
                          class="btn btn-dark"
                          onClick={this.handleBack}
                        >
                          <i class="fa fa-fw fa-angle-left"></i>
                          Page Sebelumnya{' '}
                        </button>
                      ) : (
                        <div></div>
                      )}
                    </div>
                    <div className="col-md-6 text-right">
                      {this.props.tokoListBarang.length === 12 ? (
                        <button
                          type="button"
                          class="btn btn-dark"
                          onClick={() => this.handleNext()}
                        >
                          Page Selanjutnya{' '}
                          <i class="fa fa-fw fa-angle-right"></i>
                        </button>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BackToTop />
        <Footer />
      </body>
    );
  }
}
export default connect(
  'baseUrl, isLoadingQuote, quoteAuthor, tokoNama, tokoDeskripsi, tokoPopularitas, tokoListBarang, pageToko',
  actions
)(withRouter(TokoPage));
