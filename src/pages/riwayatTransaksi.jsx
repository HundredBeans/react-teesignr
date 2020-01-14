import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import HeaderQuote from "../components/headerQuote";
import ModalLogin from "../components/modalLogin";
import ModalSignup from "../components/modalSignup";
import ModalRegisterToko from "../components/modalRegisterToko";
import DetailTransaksi from "../components/detailTransaksi";
import { actions, store } from "../store";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { Link } from "react-router-dom";
import TextTruncate from "react-text-truncate";
import axios from "axios";

class RiwayatTransaksi extends React.Component {
    handleTransaksiId = value => {
        store.setState({ transaksiId: value });
    };
    componentDidMount() {
        store.setState({ isLoadingQuote: true });
        this.props.getRandomQuote();
        this.props.getUserInfo();
    }
    render() {
        // Mengambil daftar transaksi sebanyak 10 terbaru
        const loopTransaksi = this.props.listTransaksi
            .slice(0, 11)
            .map(value => (
                <div className="row py-1 px-1 text-center border-top">
                    <Link
                        to={`/profil/transaksi/${value.id}`}
                        onClick={() => this.handleTransaksiId(value.id)}
                    >
                        <TextTruncate
                            line={2}
                            truncateText="..."
                            text={value.nama_barang}
                        />
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
                value.id,
                value.nama_barang,
                value.harga_barang,
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
                                    backgroundColor: "#1D2124"
                                }}
                            >
                                <img
                                    src={require("../img/profilpichokage1.jpg")}
                                    class="card-img-top"
                                    alt="..."
                                />
                                <div
                                    class="card-body text-center"
                                    style={{ color: "white" }}
                                >
                                    <h4
                                        className="card-text text-center border-bottom pb-2"
                                        style={{ fontWeight: "bold" }}
                                    >
                                        {this.props.userFullName}
                                    </h4>
                                    <span>{this.props.userEmail}</span>
                                    <p className="card-text border-top py-2">
                                        {this.props.punyaToko
                                            ? this.props.infoToko.nama
                                            : "Belum punya toko"}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="row">
                                <div className="col-md-8 col-sm-12 px-0">
                                    <div className="container">
                                        {detailTransaksi}
                                    </div>
                                </div>
                                <div className="col-md-4 px-0">
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
                <Footer />
            </body>
        );
    }
}
export default connect(
    "baseUrl, isLoadingQuote, quoteAuthor, listTransaksi, userFullName, userEmail, punyaToko, infoToko, transaksiId",
    actions
)(withRouter(RiwayatTransaksi));
