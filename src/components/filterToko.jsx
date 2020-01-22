import React from 'react';
import { actions, store } from '../store';
import { withRouter } from 'react-router-dom';
import { connect } from 'unistore/react';
import { Link } from 'react-router-dom';
import FilterListToko from './filterListToko';

const FilterToko = props => {
  return (
    <React.Fragment>
      <div className="container py-3">
        <div className="row">
          <div className="col-md-3 pr-0">
            <div class="card" style={{ backgroundColor: '#1D2124' }}>
              <div class="card-header border-bottom">
                <span
                  href=""
                  className="border-bottom border-dark"
                  style={{ color: 'white' }}
                >
                  FILTER <i class="fa fa-fw fa-angle-right"></i>
                </span>
              </div>
              <div class="card-body">
                <form>
                  <div className="form-group">
                    <div className="pb-2">
                      <label for="searchTokoKeyword" style={{ color: 'white' }}>
                        Cari Toko
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="searchTokoKeyword"
                        name="searchTokoKeyword"
                        onChange={e => props.handleInput(e)}
                      />
                    </div>
                  </div>
                  <div className="form-group pb-2">
                    <label
                      for="urutanTokoBerdasarkan"
                      style={{ color: 'white ' }}
                    >
                      Urutkan Berdasarkan
                    </label>
                    <select
                      className="form-control"
                      id="urutanTokoBerdasarkan"
                      name="urutanTokoBerdasarkan"
                      onChange={e => props.handleInput(e)}
                    >
                      <option value=""></option>
                      <option value="popularitas">Pop Score</option>
                      <option value="id">Terbaru</option>
                    </select>
                  </div>
                  <div className="form-group pb-2">
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="urutanToko"
                        id="urutanNaik"
                        value="desc"
                        onChange={e => props.handleInput(e)}
                      />
                      <label
                        className="form-check-label"
                        for="urutanNaik"
                        style={{ color: 'white' }}
                      >
                        Urutan Naik
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="urutanToko"
                        id="urutanTurun"
                        value="asc"
                        onChange={e => props.handleInput(e)}
                      />
                      <label
                        className="form-check-label"
                        style={{ color: 'white' }}
                        for="urutanTurun"
                      >
                        Urutan Turun
                      </label>
                    </div>
                  </div>
                  <Link to="/hasil-toko">
                    <button
                      type="button"
                      class="btn btn-dark"
                      onClick={() => props.getListToko()}
                    >
                      FILTER <i class="fa fa-fw fa-angle-right"></i>
                    </button>
                  </Link>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            {props.isLoadingSearch ? (
              <div className="row text-center">
                <span>Loading Toko ...</span>
              </div>
            ) : (
              <FilterListToko />
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default connect(
  'searchTokoKeyword, urutanTokoBerdasarkan, urutanToko, listTokoSearch, isLoadingSearch, baseUrl',
  actions
)(withRouter(FilterToko));
