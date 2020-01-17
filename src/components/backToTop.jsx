import React from 'react';

class BackToTop extends React.Component {
  backTop = () => {
    window.scrollTo(0, 0);
  };
  render() {
    return (
      <div className="row m-0">
        <div className="col-md-12 text-center p-0">
          <button type="button" class="btn btn-dark" onClick={this.backTop}>
            <i class="fa fa-fw fa-angle-right"></i>
            BACK TO TOP
            <i class="fa fa-fw fa-angle-left"></i>
          </button>
        </div>
      </div>
    );
  }
}
export default BackToTop;
