import React from "react";
import { actions } from "../store";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";

const EditPassword = props => {
  return (
    <div
      className="container"
      style={{
        backgroundColor: "#F7F7F7"
      }}
    >
      <form onSubmit={e => e.preventDefault(e)}>
        <div className="form-group row pt-3">
          <label for="inputPassLama" className="col-sm-4 col-form-label">
            Password Lama
          </label>
          <div className="col-sm-8">
            <input
              type="password"
              name="inputPassLama"
              className="form-control"
              id="inputPassLama"
              onChange={e => props.handleInput(e)}
            />
          </div>
        </div>
        <div className="form-group row">
          <label for="inputPassBaru" className="col-sm-4 col-form-label">
            Password Baru
          </label>
          <div className="col-sm-8">
            <input
              type="password"
              name="inputPassBaru"
              className="form-control"
              id="inputPassBaru"
              onChange={e => props.handleInput(e)}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-12 py-1">
            {props.isLoadingEditPass ? (
              <span>Proses Perubahan Password. Harap tunggu...</span>
            ) : (
              <button
                type="submit"
                onClick={props.handleFixPassword}
                className="btn btn-dark btn-block"
              >
                UBAH PASSWORD
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default connect(
  "baseUrl, inputPassLama, inputPassBaru, editStatus, isLoadingEditPass",
  actions
)(withRouter(EditPassword));
