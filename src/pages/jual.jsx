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
import Axios from "axios";
import BackToTop from "../components/backToTop";
import swal from "sweetalert";

class JualProduk extends React.Component {
  validateNumber = number => {
    const re = /^\d+$/;
    return re.test(number);
  };
  handleJual = () => {
    if (
      this.props.jualNamaProduk === "" ||
      this.props.jualKeuntungan === "" ||
      this.props.jualDeskripsi === "" ||
      this.props.jualDesignUrl === "" ||
      this.props.jualJenisBahan === ""
    ) {
      swal("Gagal", "Form tidak boleh kosong", "warning");
    } else if (!this.validateNumber(this.props.jualKeuntungan)) {
      swal("Gagal", "Keuntungan harus berupa angka", "warning");
    } else {
      const req = {
        method: "post",
        url: this.props.baseUrl + "/toko/jual",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        },
        data: {
          nama_barang: this.props.jualNamaProduk,
          keuntungan: this.props.jualKeuntungan,
          desain: this.props.jualDesignUrl,
          jenis_bahan: this.props.jualJenisBahan,
          deskripsi: this.props.jualDeskripsi
        }
      };
      console.log(this.props.jualJenisBahan);
      console.log(req.data);
      const self = this;
      Axios(req)
        .then(function(response) {
          store.setState({
            jualNamaProduk: "",
            jualKeuntungan: "",
            jualDesignUrl: "",
            jualJenisBahan: "",
            jualDeskripsi: ""
          });
          swal("Sukses", "Barang berhasil dijual", "success");
          self.props.history.push("/detail-produk/" + response.data.barang.id);
        })
        .catch(function(error) {
          swal("Gagal", error.response.data.message, "warning");
        });
    }
  };
  componentDidMount() {
    if (localStorage.getItem("punyaToko") !== null) {
      store.setState({ isLoadingQuote: true });
      this.props.getRandomQuote();
    } else {
      swal("Gagal", "Kamu belum mempunyai toko", "warning");
      this.props.history.push("/");
    }
  }
  render() {
    return (
      <body className="bgHome">
        <Header handleSearch={this.props.handleSearch} />
        <ModalLogin />
        <ModalRegisterToko />
        <ModalSignup />
        <HeaderQuote />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2 col-sm-0"></div>
            <div className="col-md-8 col-sm-12">
              <div className="container py-3">
                <div
                  class="card"
                  style={{
                    backgroundColor: "#F7F7F7"
                  }}
                >
                  <div class="card-header text-center">
                    <div className="row py-2">
                      <h5 class="card-title mx-auto my-auto">
                        <b>JUAL PRODUK</b>
                      </h5>
                    </div>
                  </div>
                  <div className="container px-lg-5 py-5">
                    <form
                      onSubmit={e => e.preventDefault(e)}
                      className="border px-lg-5"
                    >
                      <div className="form-group pt-3 row">
                        <label
                          for="jualNamaProduk"
                          className="col-sm-4 col-form-label"
                        >
                          Nama Produk
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="text"
                            name="jualNamaProduk"
                            className="form-control"
                            id="jualNamaProduk"
                            placeholder="Nama Produk"
                            onChange={e => this.props.handleInput(e)}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          for="jualKeuntungan"
                          className="col-sm-4 col-form-label"
                        >
                          Keuntungan / pcs
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="text"
                            name="jualKeuntungan"
                            className="form-control"
                            id="jualKeuntungan"
                            placeholder="5000"
                            onChange={e => this.props.handleInput(e)}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          for="jualJenisBahan"
                          className="col-sm-4 col-form-label"
                        >
                          Jenis Bahan
                        </label>
                        <div className="col-sm-8">
                          <select
                            className="form-control"
                            id="jualJenisBahan"
                            name="jualJenisBahan"
                            onChange={e => this.props.handleInput(e)}
                          >
                            <option value=""></option>
                            <option value="Combed 20s">Combed 20s</option>
                            <option value="Combed 24s">Combed 24s</option>
                            <option value="Combed 30s">Combed 30s</option>
                            <option value="Combed 40s">Combed 40s</option>
                            <option value="Bamboo 30s">Bamboo 30s</option>
                            <option value="Modal 30s">Modal 30s</option>
                            <option value="Supima 30s">Supima 30s</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          for="jualDeskripsi"
                          className="col-sm-4 col-form-label"
                        >
                          Deskripsi
                        </label>
                        <div className="col-sm-8">
                          <textarea
                            type="password"
                            name="jualDeskripsi"
                            className="form-control"
                            id="jualDeskripsi"
                            onChange={e => this.props.handleInput(e)}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          for="jualDesignUrl"
                          className="col-sm-4 col-form-label"
                        >
                          Desain Url
                        </label>
                        <div className="col-sm-8">
                          <div className="row">
                            <div className="col-md-12">
                              <input
                                type="text"
                                name="jualDesignUrl"
                                className="form-control"
                                id="jualDesignUrl"
                                placeholder="http://www.google.com/photo.jpg"
                                onChange={e => this.props.handleInput(e)}
                              />
                            </div>
                          </div>
                          {!(this.props.jualDesignUrl === "") ? (
                            <div className="row">
                              <div className="col-md-12">
                                <img
                                  src={this.props.jualDesignUrl}
                                  width={"100%"}
                                  alt=""
                                />
                              </div>
                            </div>
                          ) : (
                            <React.Fragment></React.Fragment>
                          )}
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-12 py-1">
                          <button
                            type="submit"
                            onClick={this.handleJual}
                            className="btn btn-dark btn-block"
                            data-dismiss="modal"
                          >
                            JUAL
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-2 col-sm-0"></div>
          </div>
        </div>
        <div className="py-5"></div>
        <BackToTop />
        <Footer />
      </body>
    );
  }
}
export default connect(
  "baseUrl, quote, quoteAuthor, isLoadingQuote, jualNamaProduk, jualKeuntungan, jualJenisBahan, jualDesignUrl, jualDeskripsi, listBarangSearch, searchKeyword",
  actions
)(withRouter(JualProduk));
