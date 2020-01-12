import React from "react";
import { actions, store } from "../store";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import TextTruncate from "react-text-truncate";

class ResultListsBarang extends React.Component {
    componentDidMount() {
        store.setState({ isLoadingSearch: false });
    }
    render() {
        const loopBaju = this.props.listBarangSearch.map((value, index) => (
            <div className="col-md-3 px-auto pb-4">
                <div class="card">
                    <img src={value.gambar} class="card-img-top" alt="..." />
                    <a
                        href={"/baju/" + value.id}
                        class="btn btn-light border-bottom"
                    >
                        <TextTruncate
                            line={2}
                            truncateText="…"
                            text={value.nama}
                        />
                    </a>
                    <span className="text-center py-1">{value.harga}</span>
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
                    <a
                        href=""
                        className="text-right"
                        style={{ color: "white" }}
                    >
                        Cari Toko
                    </a>
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
                        ) : (
                            loopBaju
                        )}
                    </div>
                </div>
                )
            </div>
        );
    }
}
export default connect(
    "quote, quoteAuthor, isLoadingQuote, searchKeyword, listBarangSearch, isLoadingSearch",
    actions
)(withRouter(ResultListsBarang));
