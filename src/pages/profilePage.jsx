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
import EditPassword from "../components/editPassword";
import axios from "axios";

class ProfilePage extends React.Component {
    handleEditPassword = () => {
        if (this.props.isLogin) {
            store.setState({ editStatus: true });
            console.log("klik");
        } else {
            alert("please login terlebih dahulu");
            console.log(this.props.isLogin);
        }
    };
    handleFixPassword = () => {
        const req = {
            method: "put",
            url: this.props.baseUrl + "/user/edit",
            data: {
                old_password: this.props.inputPassLama,
                new_password: this.props.inputPassBaru
            },
            headers: {
                Authorization: "Bearer " + this.props.token
            }
        };
        console.log(this.props.token);
        console.log(req);
        const self = this;
        axios(req)
            .then(function(response) {
                alert("password berhasil diganti");
                store.setState({ isLogin: false });
                self.props.history.push("/");
            })
            .catch(function(error) {
                console.log(error.response.data.message);
            });
    };
    handleTransaksiId = value => {
        store.setState({ editStatus: false });
        store.setState({ transaksiId: value });
    };
    componentDidMount() {
        store.setState({ isLoadingQuote: true, editStatus: false });
        this.props.getRandomQuote();
        this.props.getUserInfo(this.props.token);
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
                value.id_pemesanan,
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
                                    <button
                                        type="button"
                                        class="btn btn-dark"
                                        onClick={this.handleEditPassword}
                                    >
                                        Edit Password{" "}
                                        <i class="fa fa-fw fa-angle-right"></i>
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
                                                handleFixPassword={
                                                    this.handleFixPassword
                                                }
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
    "baseUrl, isLoadingQuote, quoteAuthor, listTransaksi, userFullName, userEmail, punyaToko, infoToko, transaksiId, token, editStatus, isLogin, inputPassLama, inputPassBaru",
    actions
)(withRouter(ProfilePage));
