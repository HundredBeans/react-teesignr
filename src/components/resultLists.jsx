import React from "react";
import ResultListsBarang from "../components/resultListsBarang";

class ResultList extends React.Component {
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
                                            >
                                                <option value="harga">
                                                    Harga
                                                </option>
                                                <option value="popularitas">
                                                    Popularitas
                                                </option>
                                                <option value="">
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
                                                    checked
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
export default ResultList;
