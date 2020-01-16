import React from "react";
import ResultListsBarang from "../components/resultListsBarang";
import { actions, store } from "../store";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { Link } from "react-router-dom";
import axios from "axios";

class ResultList extends React.Component {
    handleFilter = () => {
        console.log("klik");
        store.setState({ isLoadingSearch: true });
        const harga_minimal = this.props.hargaMin * 1;
        const harga_maksimal = this.props.hargaMax * 1;
        const orderby = this.props.urutanBerdasarkan;
        const sort = this.props.urutan;
        console.log(this.props.hargaMin);
        const req = {
            method: "get",
            url:
                this.props.baseUrl +
                `/baju?harga_minimal=${harga_minimal}&harga_maksimal=${harga_maksimal}&orderby=${orderby}&sort=${sort}`
        };
        axios(req).then(function(response) {
            store.setState({
                listBarangSearch: response.data,
                isLoadingSearch: false
            });
            console.log(response.data);
        });
    };
    render() {
        return (
            <React.Fragment>
                <div className="container py-3">
                    <div className="row">
                        <div className="col-md-3 pr-0">
                            <div
                                class="card"
                                style={{ backgroundColor: "#1D2124" }}
                            >
                                <div class="card-header border-bottom">
                                    <span
                                        href=""
                                        className="border-bottom border-dark"
                                        style={{ color: "white" }}
                                    >
                                        FILTER{" "}
                                        <i class="fa fa-fw fa-angle-right"></i>
                                    </span>
                                </div>
                                <div class="card-body">
                                    <form>
                                        <div className="form-group">
                                            <div className="pb-2">
                                                <label
                                                    for="hargaMin"
                                                    style={{ color: "white" }}
                                                >
                                                    Harga Minimal
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="hargaMin"
                                                    name="hargaMin"
                                                    onChange={e =>
                                                        this.props.handleInput(
                                                            e
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="pb-2">
                                                <label
                                                    for="hargaMax"
                                                    style={{ color: "white" }}
                                                >
                                                    Harga Maksimal
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="hargaMax"
                                                    name="hargaMax"
                                                    onChange={e =>
                                                        this.props.handleInput(
                                                            e
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group pb-2">
                                            <label
                                                for="urutanBerdasarkan"
                                                style={{ color: "white " }}
                                            >
                                                Urutkan Berdasarkan
                                            </label>
                                            <select
                                                className="form-control"
                                                id="urutanBerdasarkan"
                                                name="urutanBerdasarkan"
                                                onChange={e =>
                                                    this.props.handleInput(e)
                                                }
                                            >
                                                <option value=""></option>
                                                <option value="harga">
                                                    Harga
                                                </option>
                                                <option value="terjual">
                                                    Popularitas
                                                </option>
                                                <option value="id">
                                                    Terbaru
                                                </option>
                                            </select>
                                        </div>
                                        <div className="form-group pb-2">
                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="urutan"
                                                    id="urutanNaik"
                                                    value="asc"
                                                    onChange={e =>
                                                        this.props.handleInput(
                                                            e
                                                        )
                                                    }
                                                />
                                                <label
                                                    className="form-check-label"
                                                    for="urutanNaik"
                                                    style={{ color: "white" }}
                                                >
                                                    Urutan Naik
                                                </label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="urutan"
                                                    id="urutanTurun"
                                                    value="desc"
                                                    onChange={e =>
                                                        this.props.handleInput(
                                                            e
                                                        )
                                                    }
                                                />
                                                <label
                                                    className="form-check-label"
                                                    style={{ color: "white" }}
                                                    for="urutanTurun"
                                                >
                                                    Urutan Turun
                                                </label>
                                            </div>
                                        </div>
                                        <Link to="/hasil">
                                            <button
                                                type="button"
                                                class="btn btn-dark"
                                                onClick={() =>
                                                    this.handleFilter()
                                                }
                                            >
                                                FILTER{" "}
                                                <i class="fa fa-fw fa-angle-right"></i>
                                            </button>
                                        </Link>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <ResultListsBarang />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default connect(
    "hargaMin, hargaMax, urutanBerdasarkan, urutan, listBarangSearch, isLoadingSearch, baseUrl",
    actions
)(withRouter(ResultList));
