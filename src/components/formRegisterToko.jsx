import React from "react";
import { Link } from "react-router-dom";

class RegisterToko extends React.Component {
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
export default RegisterToko;
