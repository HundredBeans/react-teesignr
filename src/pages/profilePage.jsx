import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import HeaderQuote from '../components/headerQuote';
import ModalLogin from '../components/modalLogin';
import ModalSignup from '../components/modalSignup';
import ModalRegisterToko from '../components/modalRegisterToko';
import DetailTransaksi from '../components/detailTransaksi';
import { actions, store } from '../store';
import { withRouter } from 'react-router-dom';
import { connect } from 'unistore/react';
import { Link } from 'react-router-dom';
import TextTruncate from 'react-text-truncate';
import EditPassword from '../components/editPassword';
import axios from 'axios';
import BackToTop from '../components/backToTop';

class ProfilePage extends React.Component {
  handleEditPassword = () => {
    if (localStorage.getItem('isLogin') !== null) {
      store.setState({ editStatus: true });
      console.log('klik');
    } else {
      alert('please login terlebih dahulu');
    }
  };
  handleFixPassword = () => {
    if (this.props.inputPassLama !== '' && this.props.inputPassBaru !== '') {
      store.setState({ isLoadingEditPass: true });
      const req = {
        method: 'put',
        url: this.props.baseUrl + '/user/edit',
        data: {
          old_password: this.props.inputPassLama,
          new_password: this.props.inputPassBaru
        },
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      };
      console.log(req);
      const self = this;
      axios(req)
        .then(function(response) {
          store.setState({
            isLoadingEditPass: false,
            inputPassBaru: '',
            inputPassLama: ''
          });
          alert('password berhasil diganti, silahkan login ulang');
          localStorage.removeItem('isLogin');
          self.props.history.push('/');
        })
        .catch(function(error) {
          store.setState({ isLoadingEditPass: false });
          console.log(error.response.data.message);
          alert(error.response.data.message);
        });
    } else {
      alert('form tidak boleh kosong');
    }
  };
  handleTransaksiId = value => {
    store.setState({ editStatus: false });
    store.setState({ transaksiId: value });
  };
  componentDidMount() {
    store.setState({ isLoadingQuote: true, editStatus: false });
    this.props.getRandomQuote();
    this.props.getUserInfo(localStorage.getItem('token'));
  }
  render() {
    // Mengambil daftar transaksi sebanyak 10 terbaru
    const loopTransaksi = this.props.listTransaksi.slice(0, 11).map(value => (
      <div className="row py-1 px-1 text-center border-top">
        <Link
          to={`/profil/transaksi/${value.id}`}
          onClick={() => this.handleTransaksiId(value.id)}
        >
          <TextTruncate line={2} truncateText="..." text={value.nama_barang} />
        </Link>
      </div>
    ));
    // Filter transaksi berdasarkan transaksi yang dipilih
    const transakasiDetail = this.props.listTransaksi.filter(item => {
      if (item.id === this.props.transaksiId) {
        return item;
      }
      return false;
    });
    // Memasukkan param dari transaksi detail ke Detail transaksi
    const detailTransaksi = transakasiDetail.map(value =>
      DetailTransaksi(
        value.id_pemesanan,
        value.nama_barang,
        value.total_harga,
        value.ukuran,
        value.jumlah,
        value.waktu_pemesanan
      )
    );
    return (
      <body className="bgHome">
        <Header />
        <ModalLogin />
        <ModalSignup />
        <ModalRegisterToko />
        <HeaderQuote />
        <div className="container py-3">
          <div className="row">
            <div className="col-md-3 pr-0">
              <div
                class="card w-100"
                style={{
                  backgroundColor: '#1D2124'
                }}
              >
                <img
                  src={require('../img/profilpichokage1.jpg')}
                  class="card-img-top"
                  alt="..."
                />
                <div class="card-body text-center" style={{ color: 'white' }}>
                  <h4
                    className="card-text text-center border-bottom pb-2"
                    style={{ fontWeight: 'bold' }}
                  >
                    {this.props.userFullName}
                  </h4>
                  <span>Email : {this.props.userEmail}</span>
                  {localStorage.getItem('punyaToko') !== 'false' ? (
                    <p className="card-text border-top py-2">
                      Toko : {this.props.infoToko.nama} <br /> Keuntungan :{' '}
                      {this.props.infoToko.keuntungan}
                    </p>
                  ) : (
                    <p>Belum punya toko</p>
                  )}
                  <button
                    type="button"
                    class="btn btn-dark"
                    onClick={this.handleEditPassword}
                  >
                    Edit Password <i class="fa fa-fw fa-angle-right"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div className="row">
                <div className="col-md-8 col-sm-12 px-0">
                  <div className="container">
                    {this.props.editStatus ? (
                      <EditPassword
                        handleFixPassword={this.handleFixPassword}
                      />
                    ) : (
                      detailTransaksi
                    )}
                  </div>
                </div>
                <div className="col-md-4 px-0">
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
                        <h4 class="card-title mx-auto py-auto">
                          <b>DAFTAR TRANSAKSI</b>
                        </h4>
                      </div>
                      {loopTransaksi}
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
  'baseUrl, isLoadingQuote, quoteAuthor, listTransaksi, userFullName, userEmail, infoToko, transaksiId, token, editStatus, inputPassLama, inputPassBaru, isLoadingEditPass',
  actions
)(withRouter(ProfilePage));
