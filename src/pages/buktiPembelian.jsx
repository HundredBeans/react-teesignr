import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import HeaderQuote from "../components/headerQuote";
import ModalLogin from "../components/modalLogin";
import ModalSignup from "../components/modalSignup";
import ModalRegisterToko from "../components/modalRegisterToko";
import { actions, store } from "../store";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";

class BuktiPembelian extends React.Component {
    componentDidMount() {
        store.setState({ isLoadingQuote: true });
        this.props.getRandomQuote();
    }
    render() {
        const listBelanja = this.props.detailPembayaran.daftar_belanja.map(
            value => (
                <li>
                    {value.nama_barang} qty: {value.jumlah}, ukuran:{" "}
                    {value.ukuran}, harga: {value.total_harga}
                </li>
            )
        );
        return (
            <body className="bgHome">
                <Header />
                <ModalLogin />
                <ModalRegisterToko />
                <ModalSignup />
                <HeaderQuote />
                <div className="container-fluid pb-lg-5">
                    <div className="container py-3">
                        <div
                            class="card"
                            style={{
                                backgroundColor: "#F7F7F7"
                            }}
                        >
                            <div class="card-header text-center">
                                Copyright &copy; 2020 TEESIGNR.
                            </div>
                            <div class="card-body text-center border-bottom py-auto">
                                <div className="row">
                                    <h4 class="card-title mx-auto">
                                        <b>BUKTI PEMBELIAN</b>
                                    </h4>
                                </div>
                            </div>
                            <div className="container">
                                <div className="row py-3 border-bottom">
                                    <div className="col-md-12 text-left">
                                        <h5>DETAIL PEMESANAN</h5>
                                    </div>
                                </div>
                                <div className="container px-lg-5">
                                    <div className="row py-3">
                                        <div className="col-lg-3 col-sm-0"></div>
                                        <div className="col-lg-3 col-sm-6">
                                            <span>Nomor Pemesanan</span>
                                        </div>
                                        <div className="col-lg-3 col-sm-6">
                                            <span>
                                                :{" "}
                                                {this.props.detailPembayaran.id}
                                            </span>
                                        </div>
                                        <div className="col-lg-3 col-sm-0"></div>
                                    </div>
                                    <div className="row py-3 border-top">
                                        <div className="col-lg-3 col-sm-0"></div>
                                        <div className="col-lg-3 col-sm-6">
                                            <span>Total Harga</span>
                                        </div>
                                        <div className="col-lg-3 col-sm-6">
                                            <span>
                                                :{" "}
                                                {
                                                    this.props.detailPembayaran
                                                        .total_belanja
                                                }
                                            </span>
                                        </div>
                                        <div className="col-lg-3 col-sm-0"></div>
                                    </div>
                                    <div className="row py-3 border-top">
                                        <div className="col-lg-3 col-sm-0"></div>
                                        <div className="col-lg-3 col-sm-6">
                                            <span>Metoda Pembayaran</span>
                                        </div>
                                        <div className="col-lg-3 col-sm-6">
                                            <span>
                                                :{" "}
                                                {
                                                    this.props.detailPembayaran
                                                        .metode_pembayaran
                                                }
                                            </span>
                                        </div>
                                        <div className="col-lg-3 col-sm-0"></div>
                                    </div>
                                    <div className="row py-3 border-top">
                                        <div className="col-lg-3 col-sm-0"></div>
                                        <div className="col-lg-3 col-sm-6">
                                            <span>Nama Penerima</span>
                                        </div>
                                        <div className="col-lg-3 col-sm-6">
                                            <span>
                                                :{" "}
                                                {
                                                    this.props.detailPembayaran
                                                        .nama_penerima
                                                }
                                            </span>
                                        </div>
                                        <div className="col-lg-3 col-sm-0"></div>
                                    </div>
                                    <div className="row py-3 border-top">
                                        <div className="col-lg-3 col-sm-0"></div>
                                        <div className="col-lg-3 col-sm-6">
                                            <span>No. Telepon</span>
                                        </div>
                                        <div className="col-lg-3 col-sm-6">
                                            <span>
                                                :{" "}
                                                {
                                                    this.props.detailPembayaran
                                                        .no_telepon
                                                }
                                            </span>
                                        </div>
                                        <div className="col-lg-3 col-sm-0"></div>
                                    </div>
                                    <div className="row py-3 border-top">
                                        <div className="col-lg-3 col-sm-0"></div>
                                        <div className="col-lg-3 col-sm-6">
                                            <span>Alamat Penerima</span>
                                        </div>
                                        <div className="col-lg-3 col-sm-6">
                                            <span>
                                                :{" "}
                                                {
                                                    this.props.detailPembayaran
                                                        .alamat_penerima
                                                }
                                            </span>
                                        </div>
                                        <div className="col-lg-3 col-sm-0"></div>
                                    </div>
                                    <div className="row py-3 border-top">
                                        <div className="col-lg-3 col-sm-0"></div>
                                        <div className="col-lg-3 col-sm-6">
                                            <span>Data Pesanan</span>
                                        </div>
                                        <div className="col-lg-6 col-sm-6">
                                            <ul>{listBelanja}</ul>
                                        </div>
                                        <div className="col-lg-0 col-sm-0"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </body>
        );
    }
}
export default connect(
    "isLoadingQuote, searchKeyword, quote, quoteAuthor, listBarangSearch, detailPembayaran",
    actions
)(withRouter(BuktiPembelian));
