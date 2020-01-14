import React from "react";
import axios from "axios";
import { actions, store } from "../store";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { Link } from "react-router-dom";
import TextTruncate from "react-text-truncate";

class ListHome extends React.Component {
    componentDidMount() {
        store.setState({ isLoadingSearch: true });
        // get listBarangSearch via API
        const req = {
            method: "get",
            url: this.props.baseUrl + `/baju?orderby=terjual&sort=desc`
        };
        axios(req).then(function(response) {
            store.setState({
                listBarangSearch: response.data,
                isLoadingSearch: false
            });
            console.log(response.data);
        });
        // get listTokoSearch via API
        const reqToko = {
            method: "get",
            url: this.props.baseUrl + "/toko?orderby=popularitas&sort=desc"
        };
        axios(reqToko).then(function(response) {
            store.setState({
                listTokoSearch: response.data,
                isLoadingSearch: false
            });
        });
    }
    render() {
        const loopBaju = this.props.listBarangSearch.slice(0, 4).map(value => (
            <div className="col-md-3 px-auto pb-4">
                <div class="card text-center cardItem">
                    <img src={value.gambar} class="card-img-top" alt="..." />
                    <Link to={"/detail-produk/" + value.id}>
                        <a
                            class="btn btn-light border-bottom w-100"
                            style={{ color: "black" }}
                        >
                            <TextTruncate
                                line={2}
                                truncateText="…"
                                text={value.nama}
                            />
                        </a>
                    </Link>
                    <span className="text-center py-1">{value.harga}</span>
                </div>
            </div>
        ));
        const loopToko = this.props.listTokoSearch.slice(0, 4).map(value => (
            <div className="col-md-3 px-auto pb-4">
                <div class="card text-center">
                    <img
                        src={value.barang_populer.gambar}
                        class="card-img-top"
                        alt="..."
                    />
                    <Link to={"/detail-produk/" + value.id}>
                        <a
                            class="btn btn-light border-bottom w-100"
                            style={{ color: "black" }}
                        >
                            <TextTruncate
                                line={2}
                                truncateText="…"
                                text={value.nama}
                            />
                        </a>
                    </Link>
                    <span className="text-center py-1">
                        Popularitas : {value.popularitas}
                    </span>
                </div>
            </div>
        ));
        return (
            <React.Fragment>
                <div className="container py-3">
                    <div class="card" style={{ backgroundColor: "#1D2124" }}>
                        <div class="card-header">
                            <Link to="/hasil">
                                <a
                                    href=""
                                    className="border-bottom border-dark"
                                    style={{ color: "white" }}
                                >
                                    FEATURED T-SHIRT{" "}
                                    <i class="fa fa-fw fa-angle-right"></i>
                                </a>
                            </Link>
                        </div>
                        <div class="card-body">
                            <div className="row">{loopBaju}</div>
                        </div>
                    </div>
                </div>
                <div className="container py-3">
                    <div class="card" style={{ backgroundColor: "#1D2124" }}>
                        <div class="card-header">
                            <a
                                href=""
                                className="border-bottom border-dark"
                                style={{ color: "white" }}
                            >
                                FEATURED DESIGNER{" "}
                                <i class="fa fa-fw fa-angle-right"></i>
                            </a>
                        </div>
                        <div class="card-body">
                            <div className="row">{loopToko}</div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default connect(
    "baseUrl, listBarangSearch, listTokoSearch, isLoadingSearch",
    actions
)(withRouter(ListHome));
