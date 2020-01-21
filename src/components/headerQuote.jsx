import React from 'react';
import { actions, store } from '../store';
import { withRouter } from 'react-router-dom';
import { connect } from 'unistore/react';

class HeaderQuote extends React.Component {
  render() {
    return (
      <div className="container-fluid border-bottom CousineFont">
        <div className="container py-3">
          <div
            className="card mb-3 col-md-12"
            style={{
              backgroundColor: '#1D2124'
            }}
          >
            <div className="row no-gutters">
              <div className="col-md-2 py-2 hide-img">
                <img
                  src={require('../img/aestheticsmall.jpg')}
                  className="card-img"
                  alt="aesthetic"
                />
              </div>
              <div className="col-md-10 col-sm-12">
                <div className="card-header" style={{ color: 'white' }}>
                  Quote of the day :
                </div>
                <div className="card-body">
                  <blockquote className="blockquote mb-0">
                    <p className="card-text" style={{ color: 'white' }}>
                      "
                      {this.props.isLoadingQuote
                        ? 'Loading quotes'
                        : `${this.props.quote}`}
                      "
                    </p>
                  </blockquote>
                  <footer className="blockquote-footer">
                    {this.props.isLoadingQuote
                      ? 'unknown'
                      : this.props.quoteAuthor}
                  </footer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(
  'quote, isLoadingQuote, quoteAuthor',
  actions
)(withRouter(HeaderQuote));
