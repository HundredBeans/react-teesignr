import React from "react";
import { actions, store } from "../store";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import TextTruncate from "react-text-truncate";
import { Link } from "react-router-dom";
import axios from "axios";

class FilterListToko extends React.Component {
    handlePage = async () => {
        await store.setState({
            isLoadingSearch: true,
            pageListToko: this.props.pageListToko * 1 + 1
        });
        const req = {
            method: "get",
            url:
                this.props.baseUrl +
                "/toko?search=" +
                this.props.searchKeyword +
                "&p=" +
                this.props.pageListToko
        };
        console.log("page", this.props.pageListToko);
        const self = this;
        axios(req).then(function(response) {
            store.setState({
                listTokoSearch: response.data,
                isLoadingSearch: false
            });
            self.props.history.push("/hasil-toko");
            console.log(response.data);
            console.log(self.props.listTokoSearch);
        });
    };
    handleBack = async () => {
        await store.setState({
            isLoadingSearch: true,
            pageListToko: this.props.pageListToko * 1 - 1
        });
        const req = {
            method: "get",
            url:
                this.props.baseUrl +
                "/toko?search=" +
                this.props.searchKeyword +
                "&p=" +
                this.props.pageListToko
        };
        console.log("page", this.props.pageListToko);
        const self = this;
        axios(req).then(function(response) {
            store.setState({
                listTokoSearch: response.data,
                isLoadingSearch: false
            });
            self.props.history.push("/hasil-toko");
            console.log(response.data);
            console.log(self.props.listTokoSearch);
        });
    };
    // Tambahin component will unmount
    componentWillUnmount() {
        store.setState({ pageListToko: 1 });
    }
    componentDidMount() {
        store.setState({ isLoadingSearch: false });
    }
    render() {
        const loopToko = this.props.listTokoSearch.map((value, index) => (
            <div className="col-md-4 px-auto pb-4">
                <div class="card cardItem text-center">
                    <Link to={`toko/${value.id}`}>
                        <div
                            className="card-header"
                            style={{
                                backgroundColor: "#1D2124",
                                color: "white",
                                textDecoration: "none"
                            }}
                        >
                            <TextTruncate
                                line={2}
                                truncateText="…"
                                text={value.nama}
                            />
                        </div>
                    </Link>
                    <img
                        src={value.barang_populer.gambar}
                        class="card-img-top img-fluid"
                        alt="..."
                    />
                    <Link to={"/detail-produk/" + value.barang_populer.id}>
                        <a
                            class="btn btn-light border-bottom"
                            style={{ color: "black" }}
                        >
                            <TextTruncate
                                line={2}
                                truncateText="…"
                                text={value.barang_populer.nama}
                            />
                        </a>
                    </Link>
                    <span
                        className="text-center py-1"
                        style={{
                            backgroundColor: "#1D2124",
                            color: "white",
                            textDecoration: "none"
                        }}
                    >
                        {value.barang_populer.harga}
                    </span>
                </div>
            </div>
        ));
        return (
            <div class="card" style={{ backgroundColor: "#1D2124" }}>
                <div class="card-header border-bottom">
                    <span
                        className="border-bottom border-dark"
                        style={{ color: "white" }}
                    >
                        HASIL PENCARIAN : {this.props.searchKeyword}
                        <i class="fa fa-fw fa-angle-right"></i>
                    </span>
                    <Link to="/hasil">
                        <a
                            href=""
                            className="text-right"
                            style={{ color: "white" }}
                        >
                            Cari T-Shirt
                        </a>
                    </Link>
                </div>
                <div class="card-body">
                    <div className="row">
                        {this.props.isLoadingSearch ? (
                            <div
                                className="col-md-12 text-center"
                                style={{ color: "white" }}
                            >
                                Loading....
                            </div>
                        ) : loopToko.length === 0 ? (
                            <div
                                className="col-md-12 text-center"
                                style={{ color: "white" }}
                            >
                                Hasil pencarian tidak ditemukan
                            </div>
                        ) : (
                            loopToko
                        )}
                    </div>
                    <div className="row">
                        <div className="col-md-6 text-left">
                            {this.props.pageListToko > 1 ? (
                                <button
                                    type="button"
                                    class="btn btn-dark"
                                    onClick={this.handleBack}
                                >
                                    <i class="fa fa-fw fa-angle-left"></i>
                                    Page Sebelumnya{" "}
                                </button>
                            ) : (
                                <div></div>
                            )}
                        </div>
                        <div className="col-md-6 text-right">
                            {this.props.listTokoSearch.length === 3 ? (
                                <button
                                    type="button"
                                    class="btn btn-dark"
                                    onClick={this.handlePage}
                                >
                                    Page Selanjutnya{" "}
                                    <i class="fa fa-fw fa-angle-right"></i>
                                </button>
                            ) : (
                                <div></div>
                            )}
                        </div>
                    </div>
                </div>
                )
            </div>
        );
    }
}
export default connect(
    "quote, quoteAuthor, isLoadingQuote, searchTokoKeyword, listTokoSearch, baseUrl, isLoadingSearch, pageListToko",
    actions
)(withRouter(FilterListToko));
