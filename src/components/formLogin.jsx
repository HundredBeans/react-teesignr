import React from "react";
import axios from "axios";
import { actions, store } from "../store";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";

class FormLogin extends React.Component {
    // validate email
    validateEmail = email => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        console.log("store, " + email);
        console.log(re.test(email));
        return re.test(email);
    };
    handleLupaPassword = () => {
        if (this.validateEmail(this.props.emailInput) === false) {
            alert("Email tidak valid");
        } else {
            const req = {
                method: "post",
                url: this.props.baseUrl + "/auth/reset",
                data: {
                    email: this.props.emailInput
                }
            };
            const self = this;
            axios(req).then(function(response) {
                alert(
                    "password baru telah dikirim ke " + self.props.emailInput
                );
                self.props.history.push("/");
            });
        }
    };
    handleLogin = () => {
        if (this.validateEmail(this.props.emailInput) === false) {
            alert("Email tidak valid");
        } else if (
            this.props.emailInput === "" ||
            this.props.passwordInput === ""
        ) {
            alert("Form tidak boleh kosong, tolong isi kembali");
        } else {
            // response masih belom bisa
            const data = {
                email: this.props.emailInput,
                password: this.props.passwordInput
            };
            const self = this;
            console.log(this.props.emailInput);
            console.log(this.props.passwordInput);
            axios
                .post(this.props.baseUrl + "/auth/login", data)
                .then(function(response) {
                    if (response.status === 200) {
                        self.props.getUserInfo(response.data.token);
                        localStorage.setItem("token", response.data.token);
                        localStorage.setItem("isLogin", true);
                        alert("login berhasil");
                        console.log(response.data);
                        self.props.history.push("/");
                    } else {
                        alert("login gagal");
                        console.log(response.status);
                    }
                })
                .catch(function(error) {
                    alert(error.response.data.message);
                });
        }
    };
    render() {
        return (
            <div className="container">
                <form onSubmit={e => e.preventDefault(e)}>
                    <div className="form-group row">
                        <label
                            for="inputEmail"
                            className="col-sm-4 col-form-label"
                        >
                            E-Mail
                        </label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                name="emailInput"
                                className="form-control"
                                id="inputEmail"
                                placeholder="dobleh@email.com"
                                onChange={e => this.props.handleInput(e)}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label
                            for="inputPassword"
                            className="col-sm-4 col-form-label"
                        >
                            Password
                        </label>
                        <div className="col-sm-8">
                            <input
                                type="password"
                                name="passwordInput"
                                className="form-control"
                                id="inputPassword"
                                onChange={e => this.props.handleInput(e)}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-12 py-1">
                            <span>Lupa Password?</span>
                            <a
                                href=""
                                onClick={this.handleLupaPassword}
                                data-dismiss="modal"
                            >
                                {" "}
                                Klik disini
                            </a>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-12 py-1">
                            <button
                                type="submit"
                                onClick={this.handleLogin}
                                className="btn btn-dark btn-block"
                                data-dismiss="modal"
                            >
                                Masuk
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
export default connect(
    "baseUrl, emailInput, passwordInput",
    actions
)(withRouter(FormLogin));
