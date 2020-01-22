import React from 'react';
import { actions, store } from '../store';
import { withRouter } from 'react-router-dom';
import { connect } from 'unistore/react';
import TextTruncate from 'react-text-truncate';
import { Link } from 'react-router-dom';
import axios from 'axios';

class FilterListToko extends React.Component {
  getListToko = async () => {
    console.log('klik');
    await store.setState({ isLoadingSearch: true });
    const keyword = this.props.searchTokoKeyword;
    const orderby = this.props.urutanTokoBerdasarkan;
    const sort = this.props.urutanToko;
    const req = {
      method: 'get',
      url:
        this.props.baseUrl +
        `/toko?search=${keyword}&orderby=${orderby}&sort=${sort}` +
        '&p=' +
        this.props.pageListToko
    };
    const self = this;
    await axios(req)
      .then(function(response) {
        store.setState({
          listTokoSearch: response.data,
          isLoadingSearch: false
        });
        console.log(response.data);
        console.log(orderby);
        console.log(sort);
        self.props.history.push('/hasil-toko');
      })
      .catch(function(error) {
        console.log(error);
        console.log(error.response);
      });
  };
  handlePage = async () => {
    await store.setState({
      isLoadingSearch: true,
      pageListToko: this.props.pageListToko * 1 + 1
    });
    const req = {
      method: 'get',
      url:
        this.props.baseUrl +
        '/toko?search=' +
        this.props.searchTokoKeyword +
        '&p=' +
        this.props.pageListToko +
        `&orderby=${this.props.urutanTokoBerdasarkan}&sort=${this.props.urutanToko}`
    };
    const self = this;
    await axios(req).then(function(response) {
      store.setState({
        listTokoSearch: response.data,
        isLoadingSearch: false
      });
      self.props.history.push('/hasil-toko');
      console.log(response.data);
      console.log(self.props.listTokoSearch);
      console.log('page', self.props.pageListToko);
    });
  };
  handleBack = async () => {
    await store.setState({
      isLoadingSearch: true,
      pageListToko: this.props.pageListToko * 1 - 1
    });
    const req = {
      method: 'get',
      url:
        this.props.baseUrl +
        '/toko?search=' +
        this.props.searchTokoKeyword +
        '&p=' +
        this.props.pageListToko +
        `&orderby=${this.props.urutanTokoBerdasarkan}&sort=${this.props.urutanToko}`
    };
    console.log('page', this.props.pageListToko);
    const self = this;
    axios(req).then(function(response) {
      store.setState({
        listTokoSearch: response.data,
        isLoadingSearch: false
      });
      self.props.history.push('/hasil-toko');
    });
  };
  componentDidMount() {
    this.getListToko();
    store.setState({ isLoadingSearch: false });
  }
  render() {
    const loopToko = this.props.listTokoSearch.map((value, index) => (
      <div className="col-md-4 px-auto pb-4">
        <div class="card cardItem text-center">
          <Link to={`toko/${value.id}`}>
            <div
              className="card-header btn btn-light border-bottom w-100"
              style={{ color: 'black' }}
            >
              <TextTruncate line={2} truncateText="…" text={value.nama} />
            </div>
          </Link>
          <span>Pop Score : {value.popularitas}</span>
          {value.barang_populer !== '' ? (
            <React.Fragment>
              <img
                src={value.barang_populer.gambar}
                class="card-img-top img-fluid"
                alt="..."
                style={{ width: '100%', height: '35vh', objectFit: 'cover' }}
              />
              <Link to={'/detail-produk/' + value.barang_populer.id}>
                <a
                  class="btn btn-light border-bottom w-100"
                  style={{ color: 'black' }}
                >
                  <TextTruncate
                    line={2}
                    truncateText="…"
                    text={value.barang_populer.nama}
                  />
                </a>
              </Link>
              <span
                className="text-center py-1"
                style={{
                  textDecoration: 'none'
                }}
              >
                {value.barang_populer.harga.replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  '.'
                )}
              </span>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <img
                src={require('../img/no-image.jpg')}
                class="card-img-top img-fluid"
                alt="..."
                style={{ width: '100%', height: '35vh', objectFit: 'cover' }}
              />
              <Link to={'/detail-produk/' + value.barang_populer.id}>
                <a
                  class="btn btn-light border-bottom"
                  style={{ color: 'black' }}
                >
                  <TextTruncate
                    line={2}
                    truncateText="…"
                    text={`${value.nama} belum menjual T-SHIRT`}
                  />
                </a>
              </Link>
              <span
                className="text-center py-1"
                style={{
                  textDecoration: 'none'
                }}
              >
                Barang tidak ada
              </span>
            </React.Fragment>
          )}
        </div>
      </div>
    ));
    return (
      <div class="card" style={{ backgroundColor: '#f2f6f5' }}>
        <div class="card-header border-bottom">
          <span
            className="border-bottom border-dark"
            style={{ color: 'black' }}
          >
            HASIL PENCARIAN : {this.props.searchKeyword}
            <i class="fa fa-fw fa-angle-right"></i>
          </span>
          <Link to="/hasil">
            <a href="" className="text-right" style={{ color: 'black' }}>
              Cari T-Shirt
            </a>
          </Link>
        </div>
        <div class="card-body">
          <div className="row">
            {this.props.isLoadingSearch ? (
              <div className="col-md-12 text-center" style={{ color: 'black' }}>
                Loading....
              </div>
            ) : loopToko.length === 0 ? (
              <div className="col-md-12 text-center" style={{ color: 'black' }}>
                Hasil pencarian tidak ditemukan
              </div>
            ) : (
              loopToko
            )}
          </div>
          <div className="row">
            <div className="col-md-6 text-left">
              {this.props.pageListToko > 1 ? (
                <button
                  type="button"
                  class="btn btn-dark"
                  onClick={this.handleBack}
                >
                  <i class="fa fa-fw fa-angle-left"></i>
                </button>
              ) : (
                <div></div>
              )}
            </div>
            <div className="col-md-6 text-right">
              {this.props.listTokoSearch.length === 3 ? (
                <button
                  type="button"
                  class="btn btn-dark"
                  onClick={this.handlePage}
                >
                  <i class="fa fa-fw fa-angle-right"></i>
                </button>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(
  'quote, quoteAuthor, isLoadingQuote, searchTokoKeyword, listTokoSearch, baseUrl, isLoadingSearch, pageListToko, urutanToko, urutanTokoBerdasarkan',
  actions
)(withRouter(FilterListToko));
