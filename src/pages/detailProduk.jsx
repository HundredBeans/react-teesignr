import React, { PureComponent } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import HeaderQuote from "../components/headerQuote";
import ModalLogin from "../components/modalLogin";
import ModalSignup from "../components/modalSignup";
import ModalRegisterToko from "../components/modalRegisterToko";
import ProductComponent from "../components/productComponent";
import NotFoundProduct from "../components/notFoundProduk";
import { actions, store } from "../store";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import axios from "axios";
// import not found css
import "../style/nomatch.css";

class DetailProduk extends React.Component {
    axiosBarangId = () => {
        const req = {
            method: "get",
            url: this.props.baseUrl + "/baju/" + this.props.match.params.id
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
                    detailFound: true
                });
            })
            .catch(function(error) {
                store.setState({ detailFound: false });
            });
    };
    componentDidMount() {
        store.setState({ isLoadingQuote: true });
        this.props.getRandomQuote();
    }
    render() {
        const productComponent = this.axiosBarangId();
        console.log("jalan");
        console.log(this.props.match.params);
        console.log(productComponent);
        return (
            <body className="bgHome">
                <Header handleSearch={this.props.handleSearch} />
                <ModalLogin />
                <ModalRegisterToko />
                <ModalSignup />
                <div className="bgHome">
                    <HeaderQuote />
                </div>
                {this.props.detailFound ? (
                    <ProductComponent
                        namaProduk={this.props.detailNamaProduk}
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
                <Footer />
            </body>
        );
    }
}
export default connect(
    "quote, quoteAuthor, isLoadingQuote, searchKeyword, listBarangSearch, baseUrl, detailNamaProduk, detailNamaToko, detailUrlGambar, detailHargaProduk, detailProdukTerjual, detailDeskripsiProduk, detailFound",
    actions
)(withRouter(DetailProduk));
