import React from 'react';
import { actions, store } from '../store';
import { withRouter } from 'react-router-dom';
import { connect } from 'unistore/react';
import TextTruncate from 'react-text-truncate';
import { Link } from 'react-router-dom';
import axios from 'axios';

class ResultListsBarang extends React.Component {
  getListBarang = async () => {
    await store.setState({
      isLoadingSearch: true
    });
    if (this.props.hargaMin === '') {
      store.setState({ hargaMin: 0 });
    } else if (this.props.hargaMax === '') {
      store.setState({ hargaMax: 99999999 });
    }
    const req = {
      method: 'get',
      url:
        this.props.baseUrl +
        `/baju?search=${this.props.searchKeyword}&orderby=${this.props.urutanBerdasarkan}&sort=${this.props.urutan}&p=${this.props.pageBarang}&harga_minimal=${this.props.hargaMin}&harga_maksimal=${this.props.hargaMax}`
    };
    console.log('page', this.props.pageBarang);
    const self = this;
    axios(req).then(function(response) {
      store.setState({
        listBarangSearch: response.data,
        isLoadingSearch: false
      });
      self.props.history.push('/hasil');
    });
  };
  handlePage = async () => {
    await store.setState({
      isLoadingSearch: true,
      pageBarang: this.props.pageBarang * 1 + 1
    });
    if (this.props.hargaMin === '') {
      store.setState({ hargaMin: 0 });
    } else if (this.props.hargaMax === '') {
      store.setState({ hargaMax: 99999999 });
    }
    const req = {
      method: 'get',
      url:
        this.props.baseUrl +
        `/baju?search=${this.props.searchKeyword}&orderby=${this.props.urutanBerdasarkan}&sort=${this.props.urutan}&p=${this.props.pageBarang}&harga_minimal=${this.props.hargaMin}&harga_maksimal=${this.props.hargaMax}`
    };
    console.log('page', this.props.pageBarang);
    const self = this;
    axios(req).then(function(response) {
      store.setState({
        listBarangSearch: response.data,
        isLoadingSearch: false
      });
      self.props.history.push('/hasil');
    });
  };
  handleBack = async () => {
    await store.setState({
      isLoadingSearch: true,
      pageBarang: this.props.pageBarang * 1 - 1
    });
    if (this.props.hargaMin === '') {
      store.setState({ hargaMin: 0 });
    } else if (this.props.hargaMax === '') {
      store.setState({ hargaMax: 99999999 });
    }
    const req = {
      method: 'get',
      url:
        this.props.baseUrl +
        `/baju?search=${this.props.searchKeyword}&orderby=${this.props.urutanBerdasarkan}&sort=${this.props.urutan}&p=${this.props.pageBarang}&harga_minimal=${this.props.hargaMin}&harga_maksimal=${this.props.hargaMax}`
    };
    console.log('page', this.props.pageBarang);
    const self = this;
    axios(req).then(function(response) {
      store.setState({
        listBarangSearch: response.data,
        isLoadingSearch: false
      });
      self.props.history.push('/hasil');
      console.log(response.data);
      console.log(self.props.listBarangSearch);
    });
  };
  componentDidMount() {
    store.setState({ isLoadingSearch: false });
    this.getListBarang();
  }
  render() {
    const loopBaju = this.props.listBarangSearch.map((value, index) => (
      <div className="col-md-3 px-auto pb-4 col-sm-4 col-6">
        <div className="card cardItem text-center">
          <img
            src={value.gambar}
            className="card-img-top img-fluid"
            alt="..."
            style={{ width: '100%', height: '30vh', objectFit: 'cover' }}
          />
          <Link to={'/detail-produk/' + value.id}>
            <a
              className="btn btn-light border-bottom w-100"
              style={{ color: 'black' }}
            >
              <TextTruncate line={2} truncateText="…" text={value.nama} />
            </a>
          </Link>
          <span className="text-center py-1">
            {value.harga.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
          </span>
        </div>
      </div>
    ));
    return (
      <div className="card" style={{ backgroundColor: '#f2f6f5' }}>
        <div className="card-header border-bottom">
          <span
            className="border-bottom border-dark"
            style={{ color: 'black' }}
          >
            HASIL PENCARIAN : {this.props.searchKeyword}
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
          <Link to="hasil-toko">
            <a href="" className="text-right" style={{ color: 'black' }}>
              Cari Toko
            </a>
          </Link>
        </div>
        <div className="card-body">
          <div className="row">
            {this.props.isLoadingSearch ? (
              <div className="col-md-12 text-center" style={{ color: 'black' }}>
                Loading....
              </div>
            ) : loopBaju.length === 0 ? (
              <div className="col-md-12 text-center" style={{ color: 'black' }}>
                Hasil pencarian tidak ditemukan
              </div>
            ) : (
              loopBaju
            )}
          </div>
          <div className="row">
            <div className="col-md-6 text-left">
              {this.props.pageBarang > 1 ? (
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={this.handleBack}
                >
                  <i className="fa fa-fw fa-angle-left"></i>
                </button>
              ) : (
                <div></div>
              )}
            </div>
            <div className="col-md-6 text-right">
              {this.props.listBarangSearch.length === 12 ? (
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={this.handlePage}
                >
                  <i className="fa fa-fw fa-angle-right"></i>
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
  'quote, quoteAuthor, isLoadingQuote, searchKeyword, listBarangSearch, baseUrl, isLoadingSearch, pageBarang, urutanBerdasarkan, urutan, hargaMin, hargaMax',
  actions
)(withRouter(ResultListsBarang));
