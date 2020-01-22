import React from 'react';
import { actions, store } from '../store';
import { withRouter } from 'react-router-dom';
import { connect } from 'unistore/react';
import { Link } from 'react-router-dom';
import FilterListToko from './filterListToko';
import axios from 'axios';

class FilterToko extends React.Component {
  handleFilterToko = () => {
    console.log('klik filter');
    store.setState({ isLoadingSearch: true });
    const keyword = this.props.searchTokoKeyword;
    const orderby = this.props.urutanTokoBerdasarkan;
    const sort = this.props.urutanToko;
    const req = {
      method: 'get',
      url:
        this.props.baseUrl +
        `/toko?search=${keyword}&orderby=${orderby}&sort=${sort}` +
        '&p=1'
    };
    axios(req)
      .then(function(response) {
        store.setState({
          listTokoSearch: response.data,
          isLoadingSearch: false,
          pageListToko: 1
        });
        console.log(response.data);
        console.log(orderby);
        console.log(sort);
      })
      .catch(function(error) {
        console.log(error);
        console.log(error.response);
      });
  };
  render() {
    return (
      <React.Fragment>
        <div className="container py-3">
          <div className="row">
            <div className="col-md-3 pr-0">
              <div class="card" style={{ backgroundColor: '#f2f6f5' }}>
                <div class="card-header border-bottom">
                  <span
                    href=""
                    className="border-bottom border-dark"
                    style={{ color: 'black' }}
                  >
                    FILTER <i class="fa fa-fw fa-angle-right"></i>
                  </span>
                </div>
                <div class="card-body">
                  <form>
                    <div className="form-group">
                      <div className="pb-2">
                        <label
                          for="searchTokoKeyword"
                          style={{ color: 'black' }}
                        >
                          Cari Toko
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="searchTokoKeyword"
                          name="searchTokoKeyword"
                          onChange={e => this.props.handleInput(e)}
                        />
                      </div>
                    </div>
                    <div className="form-group pb-2">
                      <label
                        for="urutanTokoBerdasarkan"
                        style={{ color: 'black ' }}
                      >
                        Urutkan Berdasarkan
                      </label>
                      <select
                        className="form-control"
                        id="urutanTokoBerdasarkan"
                        name="urutanTokoBerdasarkan"
                        onChange={e => this.props.handleInput(e)}
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
                          value="asc"
                          onChange={e => this.props.handleInput(e)}
                        />
                        <label
                          className="form-check-label"
                          for="urutanNaik"
                          style={{ color: 'black' }}
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
                          value="desc"
                          onChange={e => this.props.handleInput(e)}
                        />
                        <label
                          className="form-check-label"
                          style={{ color: 'black' }}
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
                        onClick={() => this.handleFilterToko()}
                      >
                        FILTER <i class="fa fa-fw fa-angle-right"></i>
                      </button>
                    </Link>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <FilterListToko />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(
  'searchTokoKeyword, urutanTokoBerdasarkan, urutanToko, listTokoSearch, isLoadingSearch, baseUrl, pageListToko',
  actions
)(withRouter(FilterToko));
