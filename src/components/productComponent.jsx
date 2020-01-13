import React from "react";
import { actions, store } from "../store";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { Link } from "react-router-dom";
import Axios from "axios";

class ProductComponent extends React.Component {
    handleBuy = () => {
        const req = {
            method: "post",
            url: this.props.baseUrl + "/baju/" + this.props.match.params.id,
            data: {
                jumlah: this.props.beliJumlah,
                ukuran: this.props.beliUkuran
            },
            headers: {
                Authorization: "Bearer " + this.props.token
            }
        };
        console.log("buy");
        const self = this;
        Axios(req).then(function(response) {
            alert(response.data.status);
            self.props.history.push("/checkout");
        });
    };
    render() {
        return (
            <div
                className="container border my-3 rounded-lg"
                style={{ backgroundColor: "#F7F7F7" }}
            >
                <div className="row text-center">
                    <div className="col-md-12 border-bottom py-3">
                        <h3 style={{ fontWeight: "bold" }}>
                            {this.props.namaProduk}
                        </h3>
                    </div>
                </div>
                <div className="row text-center">
                    <div className="col-md-12 border-bottom py-1">
                        <h4 style={{ fontWeight: "bold" }}>
                            {this.props.namaToko}
                        </h4>
                    </div>
                </div>
                <div className="row">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 pl-lg-5 py-3">
                                <img
                                    src={this.props.urlFoto}
                                    className="w-100"
                                />
                            </div>
                            <div className="col-md-6 pr-lg-5">
                                <div className="row">
                                    <div className="col-md-12 text-center py-3 border-bottom">
                                        <h3 style={{ fontWeight: "bold" }}>
                                            {this.props.hargaProduk}
                                        </h3>
                                    </div>
                                </div>
                                <div className="row py-3">
                                    <div className="col-md-6 text-left">
                                        <span>Deskripsi</span>
                                    </div>
                                    <div className="col-md-6 text-right">
                                        <span>
                                            Terjual : {this.props.produkTerjual}
                                        </span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 pb-4 border-bottom">
                                        <p>{this.props.deskripsiProduk}</p>
                                    </div>
                                </div>
                                <form>
                                    <div className="row py-3 border-bottom">
                                        <div className="col-md-6">
                                            <label
                                                for="beliUkuran"
                                                className="col-md-12 px-0 m-0 border"
                                            >
                                                Ukuran
                                            </label>
                                            <div className="col-md-12 px-0">
                                                <select
                                                    className="form-control"
                                                    id="beliUkuran"
                                                    name="beliUkuran"
                                                    onChange={e =>
                                                        this.props.handleInput(
                                                            e
                                                        )
                                                    }
                                                >
                                                    <option value=""></option>
                                                    <option value="S">S</option>
                                                    <option value="M">M</option>
                                                    <option value="L">L</option>
                                                    <option value="XL">
                                                        XL
                                                    </option>
                                                    <option value="XXL">
                                                        XXL
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label
                                                for="beliJumlah"
                                                className="col-md-12 px-0 m-0 border"
                                            >
                                                Jumlah
                                            </label>
                                            <div className="col-md-12 px-0">
                                                <select
                                                    className="form-control"
                                                    id="beliJumlah"
                                                    name="beliJumlah"
                                                    onChange={e =>
                                                        this.props.handleInput(
                                                            e
                                                        )
                                                    }
                                                >
                                                    <option value=""></option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                    <option value="7">7</option>
                                                    <option value="8">8</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6"></div>
                                    </div>
                                </form>
                                <div className="row pt-3">
                                    <div className="col-md-6">
                                        <button
                                            type="button"
                                            class="btn btn-dark w-100"
                                            onClick={this.handleAddToCart}
                                        >
                                            Add to Cart{" "}
                                            <i class="fa fa-fw fa-angle-right"></i>
                                        </button>
                                    </div>
                                    <div className="col-md-6">
                                        <button
                                            type="button"
                                            class="btn btn-dark w-100"
                                            onClick={this.handleBuy}
                                        >
                                            Buy{" "}
                                            <i class="fa fa-fw fa-angle-right"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default connect(
    "baseUrl, beliUkuran, beliJumlah, token",
    actions
)(withRouter(ProductComponent));
