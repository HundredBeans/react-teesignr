import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <div
        className="container-fluid py-1"
        style={{ backgroundColor: '#1D2124' }}
      >
        <div className="row">
          <span style={{ color: 'white' }}>
            Copyright &copy; 2020 TEESIGNR. All rights reserved.
          </span>
        </div>
      </div>
    );
  }
}
export default Footer;
