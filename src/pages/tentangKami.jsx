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
import { Link } from "react-router-dom";

class TentangKami extends React.Component {
    componentDidMount() {
        this.props.getRandomQuote();
    }
    render() {
        return (
            <body className="bgHome">
                <Header />
                <ModalLogin />
                <ModalSignup />
                <ModalRegisterToko />
                <HeaderQuote />
                <div className="container py-3">
                    <div
                        class="card text-center"
                        style={{
                            backgroundColor: "#1D2124",
                            color: "white"
                        }}
                    >
                        <div class="card-header">
                            Copyright &copy; 2020 TEESIGNR.
                        </div>
                        <div class="card-body border-bottom">
                            <h5 class="card-title">
                                <b>APA ITU TEESIGNR?</b>
                            </h5>
                            <p class="card-text">
                                "Secara singkat, TEESIGNR adalah sebuah{" "}
                                <i>E-Commerce</i> A E S T H E T I C yang
                                menyediakan tempat untuk semua orang yang ingin
                                mendapatkan suatu desain atau karya original
                                dari suatu desainer atau komunitas dalam bentuk
                                T-SHIRT. Selain itu, TEESIGNR juga sebagai wadah
                                untuk menghasilkan ca$$h dengan bermodalkan
                                karya atau desain"
                            </p>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">
                                <b>KEUNTUNGAN DALAM MENGGUNAKAN TEESIGNR</b>
                            </h5>
                            <div className="row border-bottom border-top py-3">
                                <div className="col-md-2 my-auto">
                                    <h3>I.</h3>
                                </div>
                                <div className="col-md-10 border-left">
                                    <p class="card-text text-justify">
                                        <b>Kualitas T-SHIRT yang terjamin. </b>
                                        TEESIGNR menjadi tempat yang tepat untuk
                                        kebutuhan produksi T-SHIRT dengan kamu
                                        sendiri yang menentukan desain dan bahan
                                        T-SHIRT-nya. Kamu juga bisa pesan
                                        T-SHIRT untuk diri sendiri dengan
                                        pilihan yang beragam dari berbagai
                                        desainer ataupun komunitas dengan harga
                                        murah dan kualitas yang terjamin
                                    </p>
                                </div>
                            </div>
                            <div className="row py-3 border-bottom">
                                <div className="col-md-10 border-right">
                                    <p class="card-text text-justify">
                                        <b>
                                            Buka toko dengan desain sendiri
                                            tanpa MODAL!
                                        </b>{" "}
                                        Buat kamu yang punya banyak karya, ide,
                                        gambar, dan desain dapat membuka toko
                                        online dengan hanya bermodalkan 0 rupiah
                                        dan desain. TEESIGNR akan meng
                                        <i>cover</i> semua biaya produksi,
                                        pengiriman, dan semuanya. Kamu hanya
                                        tinggal mengirim desain, memilih bahan
                                        T-SHIRT, dan menentukan berapa banyak
                                        keuntungan yang mau kamu ambil dari
                                        setiap T-SHIRT yang terjual. TEESIGNR
                                        menjadi solusi yang terbaik untuk
                                        mencari pendapatan sampingan dengan
                                        memanfaatkan kreativitas kamu.
                                    </p>
                                </div>
                                <div className="col-md-2 my-auto">
                                    <h3>II.</h3>
                                </div>
                            </div>
                            <div className="row py-3 border-bottom">
                                <div className="col-md-12">
                                    {localStorage.getItem("isLogin") ===
                                    null ? (
                                        <button
                                            type="submit"
                                            className="btn btn-dark"
                                            data-toggle="modal"
                                            data-target="#ModalSignup"
                                        >
                                            DAFTAR SEKARANG
                                        </button>
                                    ) : localStorage.getItem("punyaToko") ===
                                      "false" ? (
                                        <button
                                            type="submit"
                                            className="btn btn-dark"
                                            data-toggle="modal"
                                            data-target="#ModalRegisterToko"
                                        >
                                            MULAI BERJUALAN
                                        </button>
                                    ) : (
                                        <Link to="/jual">
                                            <button
                                                type="submit"
                                                className="btn btn-dark"
                                            >
                                                MULAI BERJUALAN
                                            </button>
                                        </Link>
                                    )}
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
    "quote, quoteAuthor, isLoadingQuote",
    actions
)(withRouter(TentangKami));
