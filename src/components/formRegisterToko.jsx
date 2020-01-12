import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { actions, store } from "../store";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";

class RegisterToko extends React.Component {
    handleRegisterToko = () => {
        if (
            this.props.inputNamaToko === "" ||
            this.props.inputDeskripsiToko === ""
        ) {
            alert("Form tidak boleh kosong, mohon diisi kembali");
        } else {
            const req = {
                method: "post",
                url: this.props.baseUrl + "/toko/register",
                headers: {
                    Authorization: "Bearer " + this.props.token
                },
                data: {
                    nama_toko: this.props.inputNamaToko,
                    deskripsi: this.props.inputDeskripsiToko
                }
            };
            Axios(req).then(function(response) {
                alert("register toko berhasil");
                store.setState({ punyaToko: true });
            });
        }
    };
    render() {
        return (
            <div className="container">
                <form onSubmit={e => e.preventDefault(e)}>
                    <div className="form-group row">
                        <label
                            for="inputNamaToko"
                            className="col-sm-4 col-form-label"
                        >
                            Nama Toko
                        </label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                name="inputNamaToko"
                                className="form-control"
                                id="inputNamaToko"
                                placeholder="Toko Pedya"
                                onChange={e => this.props.handleInput(e)}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label
                            for="inputDeskripsiToko"
                            className="col-sm-4 col-form-label"
                        >
                            Deskripsi Toko
                        </label>
                        <div className="col-sm-8">
                            <textarea
                                name="inputDeskripsiToko"
                                className="form-control"
                                id="inputDeskripsiToko"
                                onChange={e => this.props.handleInput(e)}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-12 py-1">
                            <span>Syarat dan Ketentuan :</span>
                            <Link to="/snk-berjualan"> Klik disini</Link>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-12 py-1">
                            <button
                                type="submit"
                                onClick={this.handleRegisterToko}
                                className="btn btn-dark btn-block"
                                data-dismiss="modal"
                            >
                                Buka Toko
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
export default connect(
    "baseUrl, inputNamaToko, inputDeskripsiToko, punyaToko, token",
    actions
)(withRouter(RegisterToko));
